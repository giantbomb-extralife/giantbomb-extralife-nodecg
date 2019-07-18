"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const extralifeMock = require("extra-life-api-mock");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const utils_1 = require("../../dist/shared/utils");
const nodecg = nodecgApiContext.get();
const POLL_INTERVAL = 30 * 1000;
const MAX_DONATIONS_TO_REMEMBER = 100;
let currentTimeout;
let teamId;
let participantId;
let lockPoll = false;
nodecg.log.info('Polling donations every %d seconds...', POLL_INTERVAL / 1000);
const extraLifeIdRep = nodecg.Replicant('extralife-id');
const extraLifeTeamIdRep = nodecg.Replicant('extralife-team-id');
const teamGoalRep = nodecg.Replicant('team-goal');
const teamRaisedRep = nodecg.Replicant('team-raised');
const yourGoalRep = nodecg.Replicant('your-goal');
const yourRaisedRep = nodecg.Replicant('your-raised');
const donationsRep = nodecg.Replicant('donations');
const lastSeenDonationRep = nodecg.Replicant('last-seen-donation');
const bypassModerationRep = nodecg.Replicant('bypass-moderation');
teamId = extraLifeTeamIdRep.value;
participantId = extraLifeIdRep.value;
extraLifeIdRep.on('change', (newValue) => {
    participantId = newValue;
    update();
});
extraLifeTeamIdRep.on('change', (newValue) => {
    teamId = newValue;
    update();
});
donationsRep.on('change', () => {
    // Delayed by one tick,
    // otherwise the Replicant system can thrash in an infinite loop.
    process.nextTick(() => {
        /**
         * Ensures that none of the various arrays in the `donations` Replicant
         * can grow in an unbounded manner.
         *
         * This is achieved by truncating them to their last `MAX_DONATIONS_TO_REMEMBER`
         * elements.
         *
         * This does mean that unprocessed donations may get lost if a large number come in at once.
         */
        for (const hopperName in donationsRep.value) { // tslint:disable-line:no-for-in
            const hopper = donationsRep.value[hopperName];
            if (hopper.length <= MAX_DONATIONS_TO_REMEMBER) {
                // Without this, we'd go into an infinite loop of `change` events.
                continue;
            }
            donationsRep.value[hopperName] = hopper.slice(-MAX_DONATIONS_TO_REMEMBER);
        }
    });
});
// TODO: implement UI for this
nodecg.listenFor('clearDonations', () => {
    reset();
});
// Get initial data
update();
async function update() {
    try {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }
        if (lockPoll) {
            return;
        }
        lockPoll = true;
        currentTimeout = undefined;
        if (!participantId) {
            currentTimeout = setTimeout(update, POLL_INTERVAL);
            return;
        }
        await updateDonations();
        await updateParticipantTotal();
        if (teamId) {
            await updateTeamTotal();
        }
    }
    catch (error) {
        nodecg.log.error('Error scraping Extra Life API:', error);
    }
    finally {
        if (!currentTimeout) {
            currentTimeout = setTimeout(update, POLL_INTERVAL);
        }
        lockPoll = false;
    }
}
async function updateDonations() {
    // Note: donations.countDonations is not trustworthy, use from user data instead
    const donationInfo = await extralifeMock.getUserDonations(participantId); // tslint:disable-line:no-unsafe-any
    // Note: When empty the api returns the donations as an empty string instead of an empty array
    if (!donationInfo || donationInfo.donations === '') {
        nodecg.log.error('No donations found for stream ID');
        return;
    }
    const temporary = [];
    let stop = false;
    donationInfo.donations.forEach((donation) => {
        if (stop) {
            return;
        }
        donation.amount = donation.amount ? utils_1.formatDollars(donation.amount) : '';
        if (donation.donorID === lastSeenDonationRep.value) {
            stop = true;
            return;
        }
        temporary.unshift(donation);
    });
    // Append the new donations to our existing replicant arrays.
    const destHopper = bypassModerationRep.value ? 'approved' : 'pending';
    donationsRep.value[destHopper] = donationsRep.value[destHopper].concat(temporary);
    // Store the ID of the most recent donation.
    // This will be used next time updateDonations() is called.
    if (temporary.length > 0) {
        lastSeenDonationRep.value = temporary[temporary.length - 1].donorID;
    }
}
async function updateParticipantTotal() {
    const participantTotal = await extralifeMock.getUserInfo(participantId); // tslint:disable-line:no-unsafe-any
    if (!participantTotal) {
        nodecg.log.error('No data found for participant ID');
        return;
    }
    yourGoalRep.value = participantTotal.fundraisingGoal;
    yourRaisedRep.value = participantTotal.sumDonations;
}
async function updateTeamTotal() {
    const teamTotal = await extralifeMock.getTeamInfo(teamId); // tslint:disable-line:no-unsafe-any
    if (!teamTotal) {
        nodecg.log.error('No data found for team ID');
        return;
    }
    teamGoalRep.value = teamTotal.fundraisingGoal;
    teamRaisedRep.value = teamTotal.sumDonations;
}
function reset() {
    donationsRep.value.pending = [];
    donationsRep.value.approved = [];
    teamRaisedRep.value = 0;
    teamGoalRep.value = 0;
    lastSeenDonationRep.value = '';
}
//# sourceMappingURL=scraper.js.map