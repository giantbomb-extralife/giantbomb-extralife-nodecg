// Ours
import {ComponentTextColor} from '../types/schemas/component-text-color';
import {DonationAmountTextColor} from '../types/schemas/donation-amount-text-color';
import {DonationLinkTextColor} from '../types/schemas/donation-link-text-color';
import {ShowDonationComments} from '../types/schemas/show-donation-comments';
import {FontSizes} from '../types/schemas/font-sizes';
import {BypassModeration} from '../types/schemas/bypass-moderation';
import GbAlert from './components/alert';

const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const donationAmountTextColorRep = nodecg.Replicant<DonationAmountTextColor>('donation-amount-text-color');
const donationLinkTextColorRep = nodecg.Replicant<DonationLinkTextColor>('donation-link-text-color');
const showDonationCommentsRep = nodecg.Replicant<ShowDonationComments>('show-donation-comments');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');
const bypassModerationRep = nodecg.Replicant<BypassModeration>('bypass-moderation');

const donationAmountTextColorInput = document.getElementById('donation_amount_text_color') as HTMLInputElement;
const donationLinkTextColorInput = document.getElementById('donation_link_text_color') as HTMLInputElement;
const defaultTextColorInput = document.getElementById('default_text_color') as HTMLInputElement;
const showDonationCommentsCheckbox = document.getElementById('show_donation_comments') as HTMLInputElement;
const bypassModerationCheckbox = document.getElementById('bypass_moderation') as HTMLInputElement;
const gameNameFontSizeInput = document.getElementById('game_name_font_size') as HTMLInputElement;
const nextGameFontSizeInput = document.getElementById('next_game_font_size') as HTMLInputElement;
const streamNameFontSizeInput = document.getElementById('stream_name_font_size') as HTMLInputElement;
const donationLinkFontSizeInput = document.getElementById('donation_link_font_size') as HTMLInputElement;
const timerFontSizeInput = document.getElementById('timer_font_size') as HTMLInputElement;
const streamRaisedFontSizeInput = document.getElementById('stream_raised_font_size') as HTMLInputElement;
const streamTotalFontSizeInput = document.getElementById('stream_total_font_size') as HTMLInputElement;
const teamRaisedFontSizeInput = document.getElementById('team_raised_font_size') as HTMLInputElement;
const teamTotalFontSizeInput = document.getElementById('team_total_font_size') as HTMLInputElement;
const donationsFontSizeInput = document.getElementById('donations_font_size') as HTMLInputElement;

donationAmountTextColorRep.on('change', (newValue: DonationAmountTextColor) => {
	donationAmountTextColorInput.value = newValue;
});

donationLinkTextColorRep.on('change', (newValue: DonationLinkTextColor) => {
	donationLinkTextColorInput.value = newValue;
});

componentTextColorRep.on('change', (newValue: ComponentTextColor) => {
	defaultTextColorInput.value = newValue;
});

showDonationCommentsRep.on('change', (newValue: ShowDonationComments) => {
	showDonationCommentsCheckbox.checked = newValue;
});

fontSizesRep.on('change', (newValue: FontSizes) => {
	gameNameFontSizeInput.value = String(newValue.gameName);
	nextGameFontSizeInput.value = String(newValue.nextGame);
	streamNameFontSizeInput.value = String(newValue.streamName);
	donationLinkFontSizeInput.value = String(newValue.donationLink);
	timerFontSizeInput.value = String(newValue.timer);
	streamRaisedFontSizeInput.value = String(newValue.streamRaised);
	streamTotalFontSizeInput.value = String(newValue.streamTotal);
	teamRaisedFontSizeInput.value = String(newValue.teamRaised);
	teamTotalFontSizeInput.value = String(newValue.teamTotal);
	donationsFontSizeInput.value = String(newValue.donations);
});

bypassModerationRep.on('change', (newValue: BypassModeration) => {
	bypassModerationCheckbox.checked = newValue;
});

NodeCG.waitForReplicants(
	donationAmountTextColorRep,
	donationLinkTextColorRep,
	componentTextColorRep,
	showDonationCommentsRep,
	bypassModerationRep,
	fontSizesRep
).then(() => {
	(document.getElementById('components-update') as HTMLButtonElement).addEventListener('click', () => {
		componentTextColorRep.value = defaultTextColorInput.value;
		donationAmountTextColorRep.value = donationAmountTextColorInput.value;
		donationLinkTextColorRep.value = donationLinkTextColorInput.value;
		showDonationCommentsRep.value = showDonationCommentsCheckbox.checked;
		bypassModerationRep.value = bypassModerationCheckbox.checked;

		if (fontSizesRep.value) {
			fontSizesRep.value.gameName = parseInt(gameNameFontSizeInput.value, 10);
			fontSizesRep.value.nextGame = parseInt(nextGameFontSizeInput.value, 10);
			fontSizesRep.value.streamName = parseInt(streamNameFontSizeInput.value, 10);
			fontSizesRep.value.donationLink = parseInt(donationLinkFontSizeInput.value, 10);
			fontSizesRep.value.timer = parseInt(timerFontSizeInput.value, 10);
			fontSizesRep.value.streamRaised = parseInt(streamRaisedFontSizeInput.value, 10);
			fontSizesRep.value.streamTotal = parseInt(streamTotalFontSizeInput.value, 10);
			fontSizesRep.value.teamRaised = parseInt(teamRaisedFontSizeInput.value, 10);
			fontSizesRep.value.teamTotal = parseInt(teamTotalFontSizeInput.value, 10);
			fontSizesRep.value.donations = parseInt(donationsFontSizeInput.value, 10);
		}

		(document.getElementById('components-success') as GbAlert).auto();
	});

	const showHideColorsBtn = document.getElementById('showHideColors') as HTMLButtonElement;
	showHideColorsBtn.addEventListener('click', () => {
		showHideColorsBtn.textContent = showHideColorsBtn.textContent === 'Show' ? 'Hide' : 'Show';
		(document.getElementById('colorContainer') as HTMLDivElement).toggleAttribute('hidden');
	});

	const showHideFontsBtn = document.getElementById('showHideFonts') as HTMLButtonElement;
	showHideFontsBtn.addEventListener('click', () => {
		showHideFontsBtn.textContent = showHideFontsBtn.textContent === 'Show' ? 'Hide' : 'Show';
		(document.getElementById('fontContainer') as HTMLDivElement).toggleAttribute('hidden');
	});
});
