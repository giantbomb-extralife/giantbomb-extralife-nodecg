'use strict';

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
const donationsRep = nodecg.Replicant<Donations>('donations', {persistent: false});
const lastSeenDonationRep = nodecg.Replicant<LastSeenDonation>('last-seen-donation', {persistent: false});

teamId = extraLifeTeamIdRep.value;
participantId = extraLifeIdRep.value;

extraLifeIdRep.on('change', (newValue: ExtralifeId) => {
	donationsRep.value.array.length = 0;
	yourRaisedRep.value = 0;
	yourGoalRep.value = 0;
	lastSeenDonationRep.value = '';
	participantId = newValue;

	update();
});

extraLifeTeamIdRep.on('change', (newValue: ExtralifeTeamId) => {
	donationsRep.value.array.length = 0;
	teamRaisedRep.value = 0;
	teamGoalRep.value = 0;
	lastSeenDonationRep.value = '';
	teamId = newValue;

	update();
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

	// Append the new donations to our existing replicant array.
	// Also, limit its length to MAX_DONATIONS_TO_REMEMBER.
	// WARNING: This could potentially drop donations if more than MAX_DONATIONS_TO_REMEMBER
	// come in since the last poll!
	donationsRep.value.array = donationsRep.value.array
		.concat(temporary)
		.slice(-MAX_DONATIONS_TO_REMEMBER);

	lastSeenDonationRep.value = donationsRep.value.array.length > 0 ?
		donationsRep.value.array[donationsRep.value.array.length - 1].donorID :
		'';
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
