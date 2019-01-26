'use strict';

import GbDonation from './components/donation.js';

const extraLifeIdRep = nodecg.Replicant('extralife-id', {defaultValue: ''});
const donationsRep = nodecg.Replicant('donations', {defaultValue: []});
const MAX_DONATIONS_TO_LIST = 20;

extraLifeIdRep.on('change', function (newValue) {
	document.getElementById('donationsLink').href =
		`http://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=${newValue}`;
});

donationsRep.on('change', function (newValue) {
	if (!newValue) {
		return;
	}

	const newArray = newValue.array;
	if (!Array.isArray(newArray)) {
		console.log('not an array');
		return;
	}

	// Remove all existing listings, since we will generate a completely new list.
	document.getElementById('recentDonations').innerHTML = '';

	// Remove the "no donations" message.
	if (document.getElementById('noDonations')) {
		document.getElementById('noDonations').remove();
	}

	// Generate and append new donation listings.
	const fragment = document.createDocumentFragment();
	newArray.slice(0, MAX_DONATIONS_TO_LIST).forEach(function (donation) {
		const donationElement = new GbDonation(donation);
		fragment.prepend(donationElement);
	});
	document.getElementById('recentDonations').appendChild(fragment);

	const remainder = newArray.length > 20 ? newArray.length - 20 : 0;
	document.getElementById('donationsLink').textContent = `And ${remainder} others`
});
