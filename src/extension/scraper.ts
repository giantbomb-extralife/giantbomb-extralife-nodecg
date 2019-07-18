// Packages
import * as extralifeMock from 'extra-life-api-mock';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {formatDollars} from '../../dist/shared/utils';
import {ExtralifeId} from '../../types/schemas/extralife-id';
import {ExtralifeTeamId} from '../../types/schemas/extralife-team-id';
import {TeamGoal} from '../../types/schemas/team-goal';
import {TeamRaised} from '../../types/schemas/team-raised';
import {YourGoal} from '../../types/schemas/your-goal';
import {YourRaised} from '../../types/schemas/your-raised';
import {Donation, Donations} from '../../types/schemas/donations';
import {LastSeenDonation} from '../../types/schemas/last-seen-donation';
import {BypassModeration} from '../../types/schemas/bypass-moderation';

const nodecg = nodecgApiContext.get();

const POLL_INTERVAL = 30 * 1000;
const MAX_DONATIONS_TO_REMEMBER = 100;

let currentTimeout: NodeJS.Timeout | undefined;
let teamId: string | number;
let participantId: string | number;
let lockPoll = false;

nodecg.log.info('Polling donations every %d seconds...', POLL_INTERVAL / 1000);

const extraLifeIdRep = nodecg.Replicant<ExtralifeId>('extralife-id');
const extraLifeTeamIdRep = nodecg.Replicant<ExtralifeTeamId>('extralife-team-id');
const teamGoalRep = nodecg.Replicant<TeamGoal>('team-goal');
const teamRaisedRep = nodecg.Replicant<TeamRaised>('team-raised');
const yourGoalRep = nodecg.Replicant<YourGoal>('your-goal');
const yourRaisedRep = nodecg.Replicant<YourRaised>('your-raised');
const donationsRep = nodecg.Replicant<Donations>('donations');
const lastSeenDonationRep = nodecg.Replicant<LastSeenDonation>('last-seen-donation');
const bypassModerationRep = nodecg.Replicant<BypassModeration>('bypass-moderation');

teamId = extraLifeTeamIdRep.value;
participantId = extraLifeIdRep.value;

extraLifeIdRep.on('change', (newValue: ExtralifeId) => {
	participantId = newValue;
	update();
});

extraLifeTeamIdRep.on('change', (newValue: ExtralifeTeamId) => {
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
			const hopper = donationsRep.value[hopperName as keyof Donations];
			if (hopper.length <= MAX_DONATIONS_TO_REMEMBER) {
				// Without this, we'd go into an infinite loop of `change` events.
				continue;
			}
			donationsRep.value[hopperName as keyof Donations] = hopper.slice(-MAX_DONATIONS_TO_REMEMBER);
		}
	});
});

// TODO: implement UI for this
nodecg.listenFor('clearDonations', () => {
	reset();
});

// Get initial data
update();

async function update(): Promise<void> {
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
	} catch (error) {
		nodecg.log.error('Error scraping Extra Life API:', error);
	} finally {
		if (!currentTimeout) {
			currentTimeout = setTimeout(update, POLL_INTERVAL);
		}
		lockPoll = false;
	}
}

async function updateDonations(): Promise<void> {
	// Note: donations.countDonations is not trustworthy, use from user data instead
	const donationInfo = await extralifeMock.getUserDonations(participantId) as { donations: Donation[] | ''; }; // tslint:disable-line:no-unsafe-any

	// Note: When empty the api returns the donations as an empty string instead of an empty array
	if (!donationInfo || donationInfo.donations === '') {
		nodecg.log.error('No donations found for stream ID');
		return;
	}

	const temporary: Donation[] = [];
	let stop = false;

	donationInfo.donations.forEach((donation: Donation) => {
		if (stop) {
			return;
		}

		donation.amount = donation.amount ? formatDollars(donation.amount) : '';

		if (donation.donorID === lastSeenDonationRep.value) {
			stop = true;
			return;
		}

		temporary.unshift(donation);
	});

	// Append the new donations to our existing replicant arrays.
	const destHopper: keyof Donations = bypassModerationRep.value ? 'approved' : 'pending';
	donationsRep.value[destHopper] = donationsRep.value[destHopper].concat(temporary);

	// Store the ID of the most recent donation.
	// This will be used next time updateDonations() is called.
	if (temporary.length > 0) {
		lastSeenDonationRep.value = temporary[temporary.length - 1].donorID;
	}
}

async function updateParticipantTotal(): Promise<void> {
	const participantTotal = await extralifeMock.getUserInfo(participantId) as { fundraisingGoal: number; sumDonations: number; }; // tslint:disable-line:no-unsafe-any

	if (!participantTotal) {
		nodecg.log.error('No data found for participant ID');
		return;
	}

	yourGoalRep.value = participantTotal.fundraisingGoal;
	yourRaisedRep.value = participantTotal.sumDonations;
}

async function updateTeamTotal(): Promise<void> {
	const teamTotal = await extralifeMock.getTeamInfo(teamId) as { fundraisingGoal: number; sumDonations: number; }; // tslint:disable-line:no-unsafe-any

	if (!teamTotal) {
		nodecg.log.error('No data found for team ID');
		return;
	}

	teamGoalRep.value = teamTotal.fundraisingGoal;
	teamRaisedRep.value = teamTotal.sumDonations;
}

function reset(): void {
	donationsRep.value.pending = [];
	donationsRep.value.approved = [];
	teamRaisedRep.value = 0;
	teamGoalRep.value = 0;
	lastSeenDonationRep.value = '';
}
