'use strict';

const donationsRepl = nodecg.Replicant('donations', {defaultValue: []});
const fontSizes = nodecg.Replicant('font-sizes');

let numDisplayed = 0;
let lastSeenDonation = null;
const pollInterval = (30 * 10);
let initial = true;

fontSizes.on('change', function (newValue) {
	window.addStylesheetRules('font-styles', [
		['#donate_text', ['font-size', (newValue.donations * 2) + 'px']],
		['#donate_link', ['font-size', newValue.donations + 'px']],
	]);
});

donationsRepl.on('change', function (newValue) {
	const newArray = newValue.array;
	if (!Array.isArray(newArray)) {
		return;
	}

	if (newArray.length === 0 || newValue.clear) {
		$('#donation-container').find('.donation').remove();
		lastSeenDonation = null;
		numDisplayed = 0;
		initial = true;
	}

	let pass = false;
	const temporary = [];
	for (let i = newArray.length - 1; i >= 0; i--) {
		const donation = newArray[i];
		if (donation.id === lastSeenDonation || pass) {
			pass = true;
			continue;
		} else {
			temporary.unshift(donation);
		}
	}

	const intervals = (temporary.length > 0 && temporary.length <= pollInterval) ?
		Math.floor(pollInterval / temporary.length) : 1;
	let j = 0;
	const bucket = temporary.length > pollInterval ? Math.ceil(temporary.length / pollInterval) : 1;
	let bucketCounter = 1;

	temporary.forEach(function (donation) {
		numDisplayed++;

		if (!initial) {
			setTimeout(function () {

				const el = $('<div style="display: none;" class="donation">' +
					'<span class="donor_name">' + (donation.displayName || 'Anonymous') + '</span>' +
					'<span class="donor_ammount">' + donation.amount + '</span>' +
					'<span class="donor_text">' + (donation.message || '') + '</span>' +
					'</div>');

				if (window.fadeOut) {
					el.prependTo('#donation-container').fadeIn().delay(window.single ? (intervals * 50) : (intervals * 100 + (intervals * 50))).fadeOut();
				} else {
					el.prependTo('#donation-container').fadeIn();
				}
			}, j * intervals * 100);
		} else {
			const el = $('<div style="display: none;" class="donation">' +
				'<span class="donor_name">' + (donation.displayName || 'Anonymous') + '</span>' +
				'<span class="donor_ammount">' + donation.amount + '</span>' +
				'<span class="donor_text">' + (donation.message || '') + '</span>' +
				'</div>');

			if (window.fadeOut) {
				// el.prependTo('#donation-container').fadeIn().delay((intervals * 100) + 300).fadeOut();
			} else {
				el.prependTo('#donation-container').fadeIn();
			}
		}

		if (numDisplayed >= 21) {
			if (window.appendDonations) {
				$('#donation-container').find('.donation').first().remove();
			} else {
				$('#donation-container').find('.donation').last().remove();
			}
		}

		if ((bucketCounter % bucket) === 0) {
			j++;
		}

		bucketCounter++;
	});

	initial = false;
	lastSeenDonation = newArray[newArray.length - 1].id;
});

$(document).ready(function () {
	rivets.bind($('#donors'), {data: data});
});
