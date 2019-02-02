const componentTextColorRep = nodecg.Replicant('component-text-color');
const donationAmountTextColorRep = nodecg.Replicant('donation-amount-text-color');
const donationLinkTextColorRep = nodecg.Replicant('donation-link-text-color');
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments');
const fontSizesRep = nodecg.Replicant('font-sizes');
const bypassModerationRep = nodecg.Replicant('bypass-moderation');
const donationAmountTextColorInput = document.getElementById('donation_amount_text_color');
const donationLinkTextColorInput = document.getElementById('donation_link_text_color');
const defaultTextColorInput = document.getElementById('default_text_color');
const showDonationCommentsCheckbox = document.getElementById('show_donation_comments');
const bypassModerationCheckbox = document.getElementById('bypass_moderation');
const gameNameFontSizeInput = document.getElementById('game_name_font_size');
const nextGameFontSizeInput = document.getElementById('next_game_font_size');
const streamNameFontSizeInput = document.getElementById('stream_name_font_size');
const donationLinkFontSizeInput = document.getElementById('donation_link_font_size');
const timerFontSizeInput = document.getElementById('timer_font_size');
const streamRaisedFontSizeInput = document.getElementById('stream_raised_font_size');
const streamTotalFontSizeInput = document.getElementById('stream_total_font_size');
const teamRaisedFontSizeInput = document.getElementById('team_raised_font_size');
const teamTotalFontSizeInput = document.getElementById('team_total_font_size');
const donationsFontSizeInput = document.getElementById('donations_font_size');
donationAmountTextColorRep.on('change', (newValue) => {
    donationAmountTextColorInput.value = newValue;
});
donationLinkTextColorRep.on('change', (newValue) => {
    donationLinkTextColorInput.value = newValue;
});
componentTextColorRep.on('change', (newValue) => {
    defaultTextColorInput.value = newValue;
});
showDonationCommentsRep.on('change', (newValue) => {
    showDonationCommentsCheckbox.checked = newValue;
});
fontSizesRep.on('change', (newValue) => {
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
bypassModerationRep.on('change', (newValue) => {
    bypassModerationCheckbox.checked = newValue;
});
NodeCG.waitForReplicants(donationAmountTextColorRep, donationLinkTextColorRep, componentTextColorRep, showDonationCommentsRep, bypassModerationRep, fontSizesRep).then(() => {
    document.getElementById('components-update').addEventListener('click', () => {
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
        document.getElementById('components-success').auto();
    });
    const showHideColorsBtn = document.getElementById('showHideColors');
    showHideColorsBtn.addEventListener('click', () => {
        showHideColorsBtn.textContent = showHideColorsBtn.textContent === 'Show' ? 'Hide' : 'Show';
        document.getElementById('colorContainer').toggleAttribute('hidden');
    });
    const showHideFontsBtn = document.getElementById('showHideFonts');
    showHideFontsBtn.addEventListener('click', () => {
        showHideFontsBtn.textContent = showHideFontsBtn.textContent === 'Show' ? 'Hide' : 'Show';
        document.getElementById('fontContainer').toggleAttribute('hidden');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LXNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBcUIsc0JBQXNCLENBQUMsQ0FBQztBQUMzRixNQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTBCLDRCQUE0QixDQUFDLENBQUM7QUFDM0csTUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUF3QiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3JHLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsd0JBQXdCLENBQUMsQ0FBQztBQUNqRyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBQy9ELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsbUJBQW1CLENBQUMsQ0FBQztBQUVwRixNQUFNLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsNEJBQTRCLENBQXFCLENBQUM7QUFDL0csTUFBTSwwQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFxQixDQUFDO0FBQzNHLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBcUIsQ0FBQztBQUNoRyxNQUFNLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQXFCLENBQUM7QUFDM0csTUFBTSx3QkFBd0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFxQixDQUFDO0FBQ2xHLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBcUIsQ0FBQztBQUNqRyxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXFC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