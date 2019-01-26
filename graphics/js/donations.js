'use strict';

window.addStylesheetRules = function (id, rules) {
	$('#' + id).remove();

	const styleEl = document.createElement('style');
	let styleSheet;

	$(styleEl).attr('id', id);
	// Append style element to head
	document.head.appendChild(styleEl);

	// Grab style sheet
	styleSheet = styleEl.sheet;

	for (const i = 0, rl = rules.length; i < rl; i++) {
		const j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
		// If the second argument of a rule is an array of arrays, correct our constiables.
		if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
			rule = rule[1];
			j = 0;
		}

		for (const pl = rule.length; j < pl; j++) {
			const prop = rule[j];
			propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
		}

		// Insert CSS Rule
		styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
	}
};

/*global rivets*/
const data = {
	donationLink: ''
};

const donationLink = nodecg.Replicant('donation-link', {defaultValue: ''});
const donationsRepl = nodecg.Replicant('donations', {defaultValue: []});
const showDonationComments = nodecg.Replicant('show-donation-comments', {defaultValue: true});
const componentTextColor = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const donationAmountTextColor = nodecg.Replicant('donation-amount-text-color', {defaultValue: '#00e1ff'});
const donationLinkTextColor = nodecg.Replicant('donation-link-text-color', {defaultValue: '#ffff00'});
const fontSizes = nodecg.Replicant('font-sizes', {
	defaultValue: {
		gameName: 24,
		nextGame: 10,
		streamName: 18,
		donationLink: 18,
		timer: 26,
		streamRaised: 24,
		streamTotal: 24,
		teamRaised: 24,
		teamTotal: 24,
		donations: 18
	}
});

donationLink.on('change', function (newValue) {
	data.donationLink = newValue;
});

data.donationLink = donationLink.value;

showDonationComments.on('change', function (newValue) {
	if (newValue === false) {
		$('#donation-container').addClass('hide-comments');
	} else {
		$('#donation-container').removeClass('hide-comments');
	}
});

componentTextColor.on('change', function (newVal) {
	$('body').css('color', newVal);
});

$('body').css('color', componentTextColor.value);

const numDisplayed = 0;
const lastSeenDonation = null;
const pollInterval = (30 * 10);
const initial = true;

fontSizes.on('change', function (newValue) {
	window.addStylesheetRules('font-styles', [
		['.donor_text', ['font-size', (newValue.donations * (2 / 3)) + 'px']],
		['#donate_text', ['font-size', (newValue.donations * 2) + 'px']],
		['#donate_link', ['font-size', newValue.donations + 'px']],
		['.donor_name', ['font-size', newValue.donations + 'px']],
		['.donor_ammount', ['font-size', newValue.donations + 'px']],
	]);
});

window.addStylesheetRules('font-styles', [
	['.donor_text', ['font-size', (fontSizes.value.donations * (2 / 3)) + 'px']],
	['#donate_text', ['font-size', (fontSizes.value.donations * 2) + 'px']],
	['#donate_link', ['font-size', fontSizes.value.donations + 'px']],
	['.donor_name', ['font-size', fontSizes.value.donations + 'px']],
	['.donor_ammount', ['font-size', fontSizes.value.donations + 'px']],
]);

donationAmountTextColor.on('change', function (newValue) {
	window.addStylesheetRules('amount-colors', [
		['.donor_ammount', ['color', newValue]]
	]);
});

donationLinkTextColor.on('change', function (newValue) {
	console.log(newValue);
	window.addStylesheetRules('link-colors', [
		['#donate_link', ['color', newValue]]
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

	const pass = false;
	const temporary = [];
	for (const i = newArray.length - 1; i >= 0; i--) {
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
	const j = 0;
	const bucket = temporary.length > pollInterval ? Math.ceil(temporary.length / pollInterval) : 1;
	const bucketCounter = 1;

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
