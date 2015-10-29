"use strict";

var componentTextColor = nodecg.Replicant('component-text-color', { defaultValue : '#ffffff' });
var donationAmountTextColor = nodecg.Replicant('donation-amount-text-color', { defaultValue : '#00e1ff' });
var donationLinkTextColor = nodecg.Replicant('donation-link-text-color', { defaultValue : '#ffff00' });
var showDonationComments = nodecg.Replicant('show-donation-comments', { defaultValue : true });
var fontSizes = nodecg.Replicant('font-sizes', { defaultValue : {
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
}});

$(document).ready(function() {
  $('#colorpicker-group').colorpicker();
  $('#donation_amount_color_picker').colorpicker();
  $('#donation_link_color_picker').colorpicker();


  donationAmountTextColor.on('change', function(oldValue, newValue) {
    $('#donation_amount_color_picker').colorpicker('setValue', newValue);
  });

  $('#donation_amount_color_picker').colorpicker('setValue', donationAmountTextColor.value);

  donationLinkTextColor.on('change', function(oldValue, newValue) {
    $('#donation_link_color_picker').colorpicker('setValue', newValue);
  });

  $('#donation_link_color_picker').colorpicker('setValue', donationLinkTextColor.value);

  componentTextColor.on('change', function(oldValue, newValue) {
    $('#colorpicker-group').colorpicker('setValue', newValue);
  });

  $('#colorpicker-group').colorpicker('setValue', componentTextColor.value);

  showDonationComments.on('change', function(oldValue, newValue) {
    $('#show_donation_comments').prop('checked', showDonationComments.value);
  });

  $('#show_donation_comments').prop('checked', showDonationComments.value);

  /* Font Sizes on change here sigh */

  fontSizes.on('change', function(oldValue, newValue) {
    $('#game_name_font_size').val(newValue.gameName);
    $('#next_game_font_size').val(newValue.nextGame);
    $('#stream_name_font_size').val(newValue.streamName);
    $('#donation_link_font_size').val(newValue.donationLink);
    $('#timer_font_size').val(newValue.timer);
    $('#stream_raised_font_size').val(newValue.streamRaised);
    $('#stream_total_font_size').val(newValue.streamTotal);
    $('#team_raised_font_size').val(newValue.teamRaised);
    $('#team_total_font_size').val(newValue.teamTotal);
    $('#donations_font_size').val(newValue.donations);
  });

  $('#game_name_font_size').val(fontSizes.value.gameName);
  $('#next_game_font_size').val(fontSizes.value.nextGame);
  $('#stream_name_font_size').val(fontSizes.value.streamName);
  $('#donation_link_font_size').val(fontSizes.value.donationLink);
  $('#timer_font_size').val(fontSizes.value.timer);
  $('#stream_raised_font_size').val(fontSizes.value.streamRaised);
  $('#stream_total_font_size').val(fontSizes.value.streamTotal);
  $('#team_raised_font_size').val(fontSizes.value.teamRaised);
  $('#team_total_font_size').val(fontSizes.value.teamTotal);
  $('#donations_font_size').val(fontSizes.value.donations);

  $('.components-update').on('click', function(e) {
    e.preventDefault();
    componentTextColor.value = $('#colorpicker-group').colorpicker('getValue');
    donationAmountTextColor.value = $('#donation_amount_color_picker').colorpicker('getValue');
    donationLinkTextColor.value = $('#donation_link_color_picker').colorpicker('getValue');
    showDonationComments.value = $('#show_donation_comments').is(':checked');

    fontSizes.value.gameName = $('#game_name_font_size').val();
    fontSizes.value.nextGame = $('#next_game_font_size').val();
    fontSizes.value.streamName = $('#stream_name_font_size').val();
    fontSizes.value.donationLink = $('#donation_link_font_size').val();
    fontSizes.value.timer = $('#timer_font_size').val();
    fontSizes.value.streamRaised = $('#stream_raised_font_size').val();
    fontSizes.value.streamTotal = $('#stream_total_font_size').val();
    fontSizes.value.teamRaised = $('#team_raised_font_size').val();
    fontSizes.value.teamTotal = $('#team_total_font_size').val();
    fontSizes.value.donations = $('#donations_font_size').val();

    $('#components-success').fadeIn().delay(500).fadeOut();
  });

  $('#showHideColors').on('click', function(e) {
    e.preventDefault();

    $('#showHideColors').text($('#showHideColors').text() === 'Show' ? 'Hide' : 'Show');

    $('#colorContainer').slideToggle();
  });

  $('#showHideFonts').on('click', function(e) {
    e.preventDefault();

    $('#showHideFonts').text($('#showHideFonts').text() === 'Show' ? 'Hide' : 'Show');

    $('#fontContainer').slideToggle();
  });
});
