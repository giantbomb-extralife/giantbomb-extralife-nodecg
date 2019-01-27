"use strict";

const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const donationAmountTextColorRep = nodecg.Replicant('donation-amount-text-color', {defaultValue: '#00e1ff'});
const donationLinkTextColorRep = nodecg.Replicant('donation-link-text-color', {defaultValue: '#ffff00'});
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments', {defaultValue: true});
const fontSizesRep = nodecg.Replicant('font-sizes');

donationAmountTextColorRep.on('change', function (newValue) {
	document.getElementById('donation_amount_text_color').value = newValue;
});

donationLinkTextColorRep.on('change', function (newValue) {
	document.getElementById('donation_link_text_color').value = newValue;
});

componentTextColorRep.on('change', function (newValue) {
	document.getElementById('default_text_color').value = newValue;
});

showDonationCommentsRep.on('change', function (newValue) {
	document.getElementById('show_donation_comments').checked = newValue;
});

fontSizesRep.on('change', function (newValue) {
	document.getElementById('game_name_font_size').value = newValue.gameName;
	document.getElementById('next_game_font_size').value = newValue.nextGame;
	document.getElementById('stream_name_font_size').value = newValue.streamName;
	document.getElementById('donation_link_font_size').value = newValue.donationLink;
	document.getElementById('timer_font_size').value = newValue.timer;
	document.getElementById('stream_raised_font_size').value = newValue.streamRaised;
	document.getElementById('stream_total_font_size').value = newValue.streamTotal;
	document.getElementById('team_raised_font_size').value = newValue.teamRaised;
	document.getElementById('team_total_font_size').value = newValue.teamTotal;
	document.getElementById('donations_font_size').value = newValue.donations;
});

NodeCG.waitForReplicants(
	donationAmountTextColorRep,
	donationLinkTextColorRep,
	componentTextColorRep,
	showDonationCommentsRep,
	fontSizesRep
).then(() => {
	document.getElementById('components-update').addEventListener('click', function () {
		componentTextColorRep.value = document.getElementById('default_text_color').value;
		donationAmountTextColorRep.value = document.getElementById('donation_amount_text_color').value;
		donationLinkTextColorRep.value = document.getElementById('donation_link_text_color').value;
		showDonationCommentsRep.value = document.getElementById('show_donation_comments').checked;

		fontSizesRep.value.gameName = document.getElementById('game_name_font_size').value;
		fontSizesRep.value.nextGame = document.getElementById('next_game_font_size').value;
		fontSizesRep.value.streamName = document.getElementById('stream_name_font_size').value;
		fontSizesRep.value.donationLink = document.getElementById('donation_link_font_size').value;
		fontSizesRep.value.timer = document.getElementById('timer_font_size').value;
		fontSizesRep.value.streamRaised = document.getElementById('stream_raised_font_size').value;
		fontSizesRep.value.streamTotal = document.getElementById('stream_total_font_size').value;
		fontSizesRep.value.teamRaised = document.getElementById('team_raised_font_size').value;
		fontSizesRep.value.teamTotal = document.getElementById('team_total_font_size').value;
		fontSizesRep.value.donations = document.getElementById('donations_font_size').value;

		document.getElementById('components-success').auto();
	});

	const showHideColorsBtn = document.getElementById('showHideColors');
	showHideColorsBtn.addEventListener('click', function () {
		showHideColorsBtn.textContent = showHideColorsBtn.textContent === 'Show' ? 'Hide' : 'Show';
		document.getElementById('colorContainer').toggleAttribute('hidden');
	});

	const showHideFontsBtn = document.getElementById('showHideFonts');
	showHideFontsBtn.addEventListener('click', function () {
		showHideFontsBtn.textContent = showHideFontsBtn.textContent === 'Show' ? 'Hide' : 'Show';
		document.getElementById('fontContainer').toggleAttribute('hidden');
	});
});
