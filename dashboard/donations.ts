'use strict';

// Ours
import {ExtralifeId} from '../types/schemas/extralife-id';
import {Donations} from '../types/schemas/donations';

const MAX_DONATIONS_TO_LIST = 20;
const extraLifeIdRep = nodecg.Replicant<ExtralifeId>('extralife-id');
const donationsRep = nodecg.Replicant<Donations>('donations');

const donationsLinkAnchor = document.getElementById('donationsLink') as HTMLAnchorElement;
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

	// Remove the "no donations" message.
	if (noDonationsSpan) {
		noDonationsSpan.remove();
	}

	const remainder = newArray.length > MAX_DONATIONS_TO_LIST ? newArray.length - MAX_DONATIONS_TO_LIST : 0;
	donationsLinkAnchor.textContent = `And ${remainder} others`;
});
