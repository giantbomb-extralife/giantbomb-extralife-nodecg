'use strict';

// Ours
import GbDashboardDonation from './components/donation.js';
import {ExtralifeId} from '../types/schemas/extralife-id';
import {Donation, Donations} from '../types/schemas/donations';

const MAX_DONATIONS_TO_LIST = 20;
const extraLifeIdRep = nodecg.Replicant<ExtralifeId>('extralife-id');
const donationsRep = nodecg.Replicant<Donations>('donations');

const donationsLinkAnchor = document.getElementById('donationsLink') as HTMLAnchorElement;
const recentDonationsDiv = document.getElementById('recentDonations') as HTMLDivElement;
const noDonationsSpan = document.getElementById('noDonations') as HTMLSpanElement;

extraLifeIdRep.on('change', (newValue: ExtralifeId) => {
	donationsLinkAnchor.href =
		`https://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=${newValue}`;
});

donationsRep.on('change', (newValue: Donations) => {
	if (!newValue) {
		return;
	}

	const newArray = newValue.array;
	if (!Array.isArray(newArray)) {
		return;
	}

	// Remove all existing listings, since we will generate a completely new list.
	recentDonationsDiv.innerHTML = '';

	// Remove the "no donations" message.
	if (noDonationsSpan) {
		noDonationsSpan.remove();
	}

	// Generate and append new donation listings.
	const fragment = document.createDocumentFragment();
	newArray.slice(0, MAX_DONATIONS_TO_LIST).forEach((donation: Donation) => {
		const donationElement = new GbDashboardDonation(donation);
		fragment.prepend(donationElement);
	});
	recentDonationsDiv.appendChild(fragment);

	const remainder = newArray.length > 20 ? newArray.length - 20 : 0;
	donationsLinkAnchor.textContent = `And ${remainder} others`;
});
