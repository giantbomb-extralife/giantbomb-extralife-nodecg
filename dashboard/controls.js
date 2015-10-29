'use strict';

// NodeCG injects the '$bundle' variable, which is a jQuery selector targeting all of our bundle's panels.
// To target one specific panel within our bundle, we can use '.filter()'.
var $panel = $bundle.filter('.controls');

var currentGame = nodecg.Replicant('current-game', { defaultValue: '' });
var nextGame = nodecg.Replicant('next-game', { defaultValue: '' });
var streamName = nodecg.Replicant('stream-name', { defaultValue: '' });
var donationLink = nodecg.Replicant('donation-link', { defaultValue: '' });
var timerValue = nodecg.Replicant('timerValue', { defaultValue : 24 * 60 * 60 });
var timerDisplayValue = nodecg.Replicant('timerDisplayValue', { defaultValue : 24 * 60 * 60 });
var timerPaused = nodecg.Replicant('timerPaused', { defaultValue : true });
var timerNegative = nodecg.Replicant('timerNegative', { defaultValue : false });

currentGame.on('change', function(oldValue, newValue) {
  $('#game_name').val(newValue);
});

nextGame.on('change', function(oldValue, newValue) {
  $('#next_game_name').val(newValue);
});

streamName.on('change', function(oldValue, newValue) {
  $('#stream_name').val(newValue);
});

donationLink.on('change', function(oldValue, newValue) {
  $('#donation_link').val(newValue);
});


timerNegative.on('change', function(oldValue, newValue) {
  var tm = $('#timer').val();
  if (newValue && tm.length > 0 && tm[0] !== '-') {
    $('#timer').val('-' + tm);
  } else if (!newValue && tm.length > 0 && tm[0] === '-') {
    $('#timer').val(tm.slice(1));
  }
})

timerDisplayValue.on('change', function(oldValue, newValue) {
  var time = numeral(newValue).format('00:00:00');

  if (timerNegative.value) {
    time = '-' + time;
  }

  $('#timer').val(time);
});

timerPaused.on('change', function(oldValue, newValue) {
  if (newValue === false) {
    $('.timer-pause').show();
    $('.timer-start').hide();
  } else {
    $('.timer-pause').hide();
    $('.timer-start').show();
  }
});

if (timerPaused.value === false) {
  $('.timer-pause').show();
  $('.timer-start').hide();
} else {
  $('.timer-pause').hide();
  $('.timer-start').show();
}

$panel.find('.game-update').on('click', function(e) {
  e.preventDefault();
  streamName.value = $('#stream_name').val();
  currentGame.value = $('#game_name').val();
  nextGame.value = $('#next_game_name').val();
  donationLink.value = $('#donation_link').val();
  $('#controls-success').fadeIn().delay(500).fadeOut();
});

$panel.find('.timer-start').on('click', function(e) {
  e.preventDefault();
  nodecg.sendMessage('startTimer');

  // Also send the "Make sure the team widget knows this is running signal"
});

$panel.find('.timer-pause').on('click', function(e) {
  e.preventDefault();
  nodecg.sendMessage('stopTimer');
});

$panel.find('.timer-stop').on('click', function(e) {
  e.preventDefault();

  // Add Warning here
  nodecg.sendMessage('stopTimer');

  // Also send the "Make sure the team widget knows this is running signal"
});

$panel.find('.adjust-timer-btn').on('click', function(e) {
  e.preventDefault();

  nodecg.sendMessage('setTimer',  numeral().unformat($('#adjust_timer').val()));
});

