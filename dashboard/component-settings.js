const componentTextColorRep = nodecg.Replicant('component-text-color');
const donationAmountTextColorRep = nodecg.Replicant('donation-amount-text-color');
const donationLinkTextColorRep = nodecg.Replicant('donation-link-text-color');
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments');
const fontSizesRep = nodecg.Replicant('font-sizes');
const donationAmountTextColorInput = document.getElementById('donation_amount_text_color');
const donationLinkTextColorInput = document.getElementById('donation_link_text_color');
const defaultTextColorInput = document.getElementById('default_text_color');
const showDonationCommentsCheckbox = document.getElementById('show_donation_comments');
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
NodeCG.waitForReplicants(donationAmountTextColorRep, donationLinkTextColorRep, componentTextColorRep, showDonationCommentsRep, fontSizesRep).then(() => {
    document.getElementById('components-update').addEventListener('click', () => {
        componentTextColorRep.value = defaultTextColorInput.value;
        donationAmountTextColorRep.value = donationAmountTextColorInput.value;
        donationLinkTextColorRep.value = donationLinkTextColorInput.value;
        showDonationCommentsRep.value = showDonationCommentsCheckbox.checked;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LXNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBcUIsc0JBQXNCLENBQUMsQ0FBQztBQUMzRixNQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTBCLDRCQUE0QixDQUFDLENBQUM7QUFDM0csTUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUF3QiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3JHLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsd0JBQXdCLENBQUMsQ0FBQztBQUNqRyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBRS9ELE1BQU0sNEJBQTRCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBcUIsQ0FBQztBQUMvRyxNQUFNLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQXFCLENBQUM7QUFDM0csTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFxQixDQUFDO0FBQ2hHLE1BQU0sNEJBQTRCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBcUIsQ0FBQztBQUMzRyxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXFCLENBQUM7QUFDakcsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFxQixDQUFDO0FBQ2pHLE1BQU0sdUJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBcUIsQ0FBQztBQUNyRyxNQUFNLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQXFC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