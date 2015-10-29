/*global rivets,numeral*/
'use strict';
var data = {
  gameName: '',
  nextGame: '',
  timer: '',
  streamName: '',
  donationLink: '',
  streamTotal: '',
  teamTotal: ''
};

var currentGame = nodecg.Replicant('current-game');
var nextGame = nodecg.Replicant('next-game');
var timerDisplayValue = nodecg.Replicant('timerDisplayValue', { defaultValue : 24 * 60 * 60 });
var timerNegative = nodecg.Replicant('timerNegative', { defaultValue : false });
var streamName = nodecg.Replicant('stream-name', { defaultValue: '' });
var donationLink = nodecg.Replicant('donation-link', { defaultValue: '' });
var teamRaised = nodecg.Replicant('team-raised', { defaultValue: 0 });
var yourRaised = nodecg.Replicant('your-raised', { defaultValue: 0 });
var donationsRepl = nodecg.Replicant('donations', { defaultValue: [] });
var showDonationComments = nodecg.Replicant('show-donation-comments', { defaultValue : true });

showDonationComments.on('change', function(oldValue, newValue) {
  if (newValue === false) {
    $('#donation-container').addClass('hide-comments');
  } else {
    $('#donation-container').removeClass('hide-comments');
  }
});

if (showDonationComments.value === false) {
  $('#donation-container').addClass('hide-comments');
}

streamName.on('change', function(oldVal, newVal) {
  data.streamName = newVal;
});

data.streamName = streamName.value;

donationLink.on('change', function(oldVal, newVal) {
  data.donationLink = newVal;
});

data.donationLink = donationLink.value;

yourRaised.on('change', function(oldVal, newVal) {
  data.streamTotal = numeral(newVal).format('$0,0.00');
});

data.streamTotal = yourRaised.value;

teamRaised.on('change', function(oldVal, newVal) {
  data.teamTotal = numeral(newVal).format('$0,0.00');
});

data.teamTotal = teamRaised.value;

currentGame.on('change', function(oldVal, newVal) {
  data.gameName = newVal;
});

data.gameName = currentGame.value;

nextGame.on('change', function(oldVal, newVal) {
  data.nextGame = newVal;
});

data.nextGame = nextGame.value;

timerDisplayValue.on('change', function(oldVal, newVal) {
  var time = numeral(newVal).format('00:00:00');

  if (timerNegative.value) {
    time = '-' + time;
  }

  data.timer = time;
});

timerNegative.on('change', function(oldValue, newValue) {
  var tm = data.timer;
  if (newValue && tm.length > 0 && tm[0] !== '-') {
    data.timer = '-' + tm;
  } else if (!newValue && tm.length > 0 && tm[0] === '-') {
    data.timer = tm.slice(1);
  }
});

data.timer = (timerNegative.value ? '-' : '') + timerDisplayValue.value;

var numDisplayed = 0;
var lastSeenDonation = null;
var pollInterval = (30 * 10);
var initial = true;

var parseDonations = function(newValue) {
    var newArray = newValue.array;
  if (!Array.isArray(newArray)) {
    return;
  }

  if (newArray.length === 0 || newValue.clear) {
    $('#donation-container').find('.donation').remove();
    lastSeenDonation = null;
    numDisplayed = 0;
    initial = true;
  }

  var pass = false;
  var temporary = [];
  for(var i = newArray.length -1; i>= 0; i--) {
    var donation = newArray[i];
    if (donation.id === lastSeenDonation || pass) {
      pass = true;
      continue;
    } else {
      temporary.unshift(donation);
    }
  }

  var intervals = (temporary.length > 0 && temporary.length <= pollInterval) ? 
                    Math.floor(pollInterval / temporary.length) : 1;
  var j = 0; 
  var bucket = temporary.length > pollInterval ? Math.ceil(temporary.length / pollInterval) : 1;
  var bucketCounter = 1;

  temporary.forEach(function(donation) {
    numDisplayed++;

    if(!initial) {
      setTimeout(function() {

        $('<div style="display: none;" class="donation">' +
          '<span class="donor_name">' + (donation.donorName || 'Anonymous') + '</span>' +
          '<span class="donor_ammount">' +  donation.donationAmount + '</span>' +
          '<span class="donor_text">' + (donation.message || '') + '</span>' +
        '</div>').prependTo('#donation-container').fadeIn();

        if (numDisplayed >= 21) {
          $('#donation-container').find('.donation').last().remove();
        }
      }, j * intervals * 100);
    } else {
      $('<div style="display: none;" class="donation">' +
        '<span class="donor_name">' + (donation.donorName || 'Anonymous') + '</span>' +
        '<span class="donor_ammount">' +  donation.donationAmount + '</span>' +
        '<span class="donor_text">' + (donation.message || '') + '</span>' +
      '</div>').prependTo('#donation-container').fadeIn();

      if (numDisplayed >= 21) {
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
};

donationsRepl.on('change', function(oldValue, newValue) {
  parseDonations(newValue);
});

if (donationsRepl.value) {
  parseDonations(donationsRepl.value);
}

$(document).ready(function() {
  rivets.bind($('#container'), { data: data });
});