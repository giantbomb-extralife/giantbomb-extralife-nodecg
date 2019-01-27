'use strict';

import GbGraphicDonation from '../components/donation.js';

const MAX_DONATIONS_TO_LIST = 20;

const donationsRep = nodecg.Replicant('donations', {defaultValue: []});
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments', {defaultValue: true});

const donationContainer = document.getElementById('donation-container');

showDonationCommentsRep.on('change', function (newValue) {
	if (newValue === false) {
		donationContainer.classList.add('hide-comments');
	} else {
		donationContainer.classList.remove('hide-comments');
	}
});

if (showDonationCommentsRep.value === false) {
	donationContainer.addClass('hide-comments');
}

donationsRep.on('change', function (newValue) {
	parseDonations(newValue);
});

let initial = true;
const pollInterval = (30 * 10);
function parseDonations(newValue) {
	if (!newValue) {
		return;
	}

	const newArray = newValue.array;
	if (!Array.isArray(newArray)) {
		return;
	}

	if (newArray.length === 0 || newValue.clear) {
		donationContainer.innerHTML = '';
		initial = true;
	}

	let pass = false;
	const mostRecentShowingDonationId = donationContainer.firstElementChild ?
		donationContainer.firstElementChild.donation.id :
		null;
	const temporary = [];
	for (let i = newArray.length - 1; i >= 0; i--) {
		const donation = newArray[i];
		if (donation.id === mostRecentShowingDonationId || pass) {
			pass = true;
			continue;
		} else {
			temporary.unshift(donation);
		}
	}

	let j = 0;
	let bucketCounter = 1;
	const intervals = (temporary.length > 0 && temporary.length <= pollInterval) ?
		Math.floor(pollInterval / temporary.length) : 1;
	const bucket = temporary.length > pollInterval ? Math.ceil(temporary.length / pollInterval) : 1;

	temporary.forEach(function (donation) {
		if (initial) {
			createAndInsertDonationElement(donation);
		} else {
			setTimeout(function () {
				createAndInsertDonationElement(donation);
			}, j * intervals * 100);
		}

		if ((bucketCounter % bucket) === 0) {
			j++;
		}

		bucketCounter++;
	});

	initial = false;
}

function createAndInsertDonationElement(donation) {
	// Create and insert the new donation element.
	const donationElement = new GbGraphicDonation(donation);
	donationElement.classList.add('donation');
	donationContainer.prepend(donationElement);

	// Remove excess donation elements.
	while (donationContainer.childElementCount > MAX_DONATIONS_TO_LIST) {
		donationContainer.lastElementChild.remove();
	}
}
