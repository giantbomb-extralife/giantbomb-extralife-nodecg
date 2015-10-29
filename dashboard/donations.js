'use strict';

// NodeCG injects the '$bundle' variable, which is a jQuery selector targeting all of our bundle's panels.
// To target one specific panel within our bundle, we can use '.filter()'.
var $panel = $bundle.filter('.data');

var extraLifeId = nodecg.Replicant('extralife-id', { defaultValue: '' });
//var recentDonations = [];
var donations = nodecg.Replicant('donations', { defaultValue: [] });
var wrapper = {
  remainder: 0,
  donationsLink: 'http://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=' + extraLifeId.value
};
var numDisplayed = 0;
var lastSeenDonation = null;
var anyDonations = false;
var pollInterval = (30 * 10);
var initial = true;

extraLifeId.on('change', function(oldValue, newValue) {
  wrapper.donationsLink = 'http://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=' + newValue;
});

rivets.bind($('#donations'), { anyDonations: anyDonations, otherData: wrapper });

donations.on('change', function(oldValue, newValue) {
  if (!newValue) {
    return;
  }

  var newArray = newValue.array;
  if (!Array.isArray(newArray)) {
    console.log('not an array');
    return;
  }

  if (newArray.length === 0 || newValue.clear) {
    $('#recentDonations').children().remove();
    lastSeenDonation = null;
    numDisplayed = 0;
    initial = true;
  }

  $('#noDonations').remove();

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
  };

  temporary.forEach(function(donation) {
    numDisplayed++;

    $('<a href="#" style="display: none;" class="list-group-item">' +
      '<h4 class="list-group-item-heading" style="float: left;">' + (donation.donorName || 'Anonymous') + (donation.donationAmount ? (' - ' + donation.donationAmount) : '' ) + '</h4>' +
      '<p class="list-group-item-heading" style="float: right;">' + donation.createdOn + '</p>' +
      '<p class="list-group-item-text" style="clear: both;">' + (donation.message || '') + '</p>' +
      '</a>').prependTo('#recentDonations').fadeIn();

    if (numDisplayed >= 21) {
      $('#recentDonations').children().last().remove();
    }
  });

  initial = false;
  lastSeenDonation = newArray.length > 0 ? newArray[newArray.length - 1].id : null;

  wrapper.remainder = newArray.length > 20 ? newArray.length - 20 : 0;
});