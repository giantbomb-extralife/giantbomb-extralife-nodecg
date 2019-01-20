'use strict';

const request = require('request-promise-native');
const md5 = require('md5');
const numeral = require('numeral');

const PARTICIPANT_URL = 'https://www.extra-life.org/api/participants/';
const DONATIONS_URL = '/donations';
const TEAM_URL = 'https://www.extra-life.org/api/teams/';
const POLL_INTERVAL = 30 * 1000;

let currentTimeout = null;
let teamId = 0;
let participantId = 0;
let firstRun = true;
let lockPoll = false;

module.exports = function (nodecg) {
	nodecg.log.info('Polling donations every %d seconds...', POLL_INTERVAL / 1000);

	const extraLifeIdRep = nodecg.Replicant('extralife-id', {defaultValue: ''});
	const extraLifeTeamIdRep = nodecg.Replicant('extralife-team-id', {defaultValue: ''});
	const teamGoalRep = nodecg.Replicant('team-goal', {defaultValue: 0});
	const teamRaisedRep = nodecg.Replicant('team-raised', {defaultValue: 0});
	const yourGoalRep = nodecg.Replicant('your-goal', {defaultValue: 0});
	const yourRaisedRep = nodecg.Replicant('your-raised', {defaultValue: 0});
	const donationsRep = nodecg.Replicant('donations', {defaultValue: {clear: 1, array: []}});
	const lastSeenDonationRep = nodecg.Replicant('last-seen-donation', {defaultValue: null});

	if (Array.isArray(donationsRep.value)) {
		donationsRep.value = {clear: 1, array: []};
	} else {
		donationsRep.value.clear = 1;
		donationsRep.value.array.length = 0;
	}

	lastSeenDonationRep.value = [];

	teamId = extraLifeTeamIdRep.value || null;
	participantId = extraLifeIdRep.value || null;

	extraLifeIdRep.on('change', function (newValue) {
		donationsRep.value.clear = donationsRep.value.clear + 1;
		donationsRep.value.array.length = 0;
		yourRaisedRep.value = 0;
		yourGoalRep.value = 0;
		lastSeenDonationRep.value = null;
		firstRun = true;
		participantId = newValue;
		update();
	});

	extraLifeTeamIdRep.on('change', function (newValue) {
		donationsRep.value.clear = donationsRep.value.clear + 1;
		donationsRep.value.array.length = 0;
		teamRaisedRep.value = 0;
		teamGoalRep.value = 0;
		lastSeenDonationRep.value = null;
		firstRun = true;
		teamId = newValue;
		update();
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
			currentTimeout = null;

			if (!firstRun && donationsRep.value.clear) {
				donationsRep.value.clear = 0;
			}
			firstRun = false;

			if (!participantId) {
				currentTimeout = setTimeout(update, POLL_INTERVAL);
				return;
			}

			const talliedTotal = await updateDonations();
			await updateParticipantTotal(talliedTotal);
			if (teamId) {
				await updateTeamTotal();
			}
		} catch (error) {
			nodecg.log.error('Error scraping Extra Life API:', error);
		} finally {
			currentTimeout = setTimeout(update, POLL_INTERVAL);
			lockPoll = false;
		}
	}

	async function updateDonations() {
		let talliedTotal = 0;
		const donations = await request({
			method: 'GET',
			uri: PARTICIPANT_URL + participantId + DONATIONS_URL,
			json: true
		});

		if (!donations) {
			nodecg.log.error('No donations found for stream ID');
			return talliedTotal;
		}

		const temporary = [];
		let stop = false;

		donations.forEach(function (donation) {
			talliedTotal += (donation.amount * 1);

			if (stop) {
				return;
			}

			const hashed = md5(donation.amount + donation.createdDateUTC + donation.displayName + donation.message);
			donation.id = hashed;
			donation.amount = donation.amount ? numeral(donation.amount).format('$0,0.00') : '';

			if (hashed === lastSeenDonationRep.value) {
				stop = true;
				return;
			}
			temporary.unshift(donation);
		});

		temporary.forEach(function (donation) {
			donationsRep.value.array.push(donation);
		});

		lastSeenDonationRep.value = donationsRep.value.array.length > 0 ?
			donationsRep.value.array[donationsRep.value.array.length - 1].id :
			null;

		if (talliedTotal > yourRaisedRep.value) {
			yourRaisedRep.value = talliedTotal;
		}

		return talliedTotal;
	}

	async function updateParticipantTotal(talliedTotal = 0) {
		const participantTotal = await request({
			method: 'GET',
			uri: PARTICIPANT_URL + participantId,
			json: true
		});

		if (!participantTotal) {
			nodecg.log.error('No data found for participant ID');
			return;
		}

		yourGoalRep.value = participantTotal.fundraisingGoal;
		if (participantTotal.sumDonations > talliedTotal) {
			yourRaisedRep.value = participantTotal.sumDonations;
		}
	}

	async function updateTeamTotal() {
		const teamTotal = await request({
			method: 'GET',
			uri: TEAM_URL + teamId,
			json: true
		});

		if (!teamTotal) {
			nodecg.log.error('No data found for team ID');
			return;
		}

		teamGoalRep.value = teamTotal.fundraisingGoal;
		teamRaisedRep.value = teamTotal.sumDonations;
	}
};
