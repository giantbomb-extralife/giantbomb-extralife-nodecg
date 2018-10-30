'use strict';

var request = require('request');
var md5 = require('md5');
var numeral = require('numeral');

const participantUrl = 'https://www.extra-life.org/api/participants/'
const donationsUrl = '/donations';
const teamUrl = 'https://www.extra-life.org/api/teams/';

var POLL_INTERVAL = 30 * 1000;
var currentTimeout = null;
//var stutter = 3;

module.exports = function(nodecg) {
  nodecg.log.info('Polling donations every %d seconds...', POLL_INTERVAL / 1000);

  var teamId = 0;
  var personId = 0;

  var extraLifeId = nodecg.Replicant('extralife-id', { defaultValue: '' });
  var extraLifeTeamId = nodecg.Replicant('extralife-team-id', { defaultValue: '' });
  var teamGoal = nodecg.Replicant('team-goal', { defaultValue: 0 });
  var teamRaised = nodecg.Replicant('team-raised', { defaultValue: 0 });
  var yourGoal = nodecg.Replicant('your-goal', { defaultValue: 0 });
  var yourRaised = nodecg.Replicant('your-raised', { defaultValue: 0 });
  var donations = nodecg.Replicant('donations', { defaultValue: { clear: 1, array: [] } });
  var lastSeenDonation = nodecg.Replicant('last-seen-donation', { defaultValue: null });
  var firstRun = true;
  var lockPoll = false;

  if (Array.isArray(donations.value)) {
    donations.value = { clear: 1, array: []};
  } else {
    donations.value.clear = 1;
    donations.value.array.length = 0;
  }

  lastSeenDonation.value = [];

  teamId = extraLifeTeamId.value || null;
  personId = extraLifeId.value || null;

  extraLifeId.on('change', function(oldValue, newValue) {
    donations.value.clear = donations.value.clear + 1;
    donations.value.array.length = 0;
    yourRaised.value = 0;
    yourGoal.value = 0;
    lastSeenDonation.value = null;
    firstRun = true;
    personId = newValue;
    update();
  });
  extraLifeTeamId.on('change', function(oldValue, newValue) {
    donations.value.clear =  donations.value.clear + 1;
    donations.value.array.length = 0;
    teamRaised.value = 0;
    teamGoal.value = 0;
    lastSeenDonation.value = null;
    firstRun = true;
    teamId = newValue;
    update();
  });


  // Get initial data
  update();

  function update() {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    if (lockPoll) {
      return;
    }

    lockPoll = true;

    currentTimeout = null;

    if (!firstRun && donations.value.clear) {
      donations.value.clear = 0;
    }
    firstRun = false;

    if (!personId) {
      currentTimeout = setTimeout(update, POLL_INTERVAL);
      return;
    }

    var talliedTotal = 0;

    request(participantUrl + personId + donationsUrl, function(err, response, data) {

      if (!data) {
        nodecg.log.error('No data found for stream ID');
      } else {
        try {
          data = JSON.parse(data);
        } catch (e) {
          data = [];
          nodecg.log.error('Could not parse donation data');
        }

        var stop = false,
            temporary = [];

        data.forEach(function(donation) {
          talliedTotal += (donation.amount * 1);

          if (stop) {
            return;
          }

          var hashed = md5(donation.amount + donation.createdDateUTC + donation.displayName + donation.message);
          donation.id = hashed;
          donation.amount = donation.amount ? numeral(donation.amount).format('$0,0.00') : '';

          if (hashed === lastSeenDonation.value) {
            stop = true;
            return;
          }
          temporary.unshift(donation);
        });

        //temporary = temporary.slice(0, stutter);

        temporary.forEach(function(donation) {
          donations.value.array.push(donation);
        });

        lastSeenDonation.value = donations.value.array.length > 0 ? donations.value.array[donations.value.array.length - 1].id : null;

        if (talliedTotal > yourRaised.value) {
          yourRaised.value = talliedTotal;
        }
      }

      request(participantUrl + personId, function(err, response, data) {
        
        if (!data) {
          nodecg.log.error('No data found for stream ID');
        } else {
          try {
            data = JSON.parse(data);
          } catch (e) {
            data = {
              fundraisingGoal: yourGoal.value,
              sumDonations: yourRaised.value
            };

            nodecg.log.error('Could not parse participant data');
          }

          yourGoal.value = data.fundraisingGoal;

          if ((data.sumDonations * 1) > talliedTotal) {
            yourRaised.value = (data.sumDonations * 1);
          }
        }

        if (teamId) {
          request(teamUrl + teamId, function(err, response, data) {
            if (!data) {
              nodecg.log.error('No data found for team ID');
            } else { 
              try {
                data = JSON.parse(data);
              } catch (e) {
                data = {
                  fundraisingGoal: teamGoal.value,
                  sumDonations: teamRaised.value
                };

                nodecg.log.error('Could not parse team data');
              }

              teamGoal.value = data.fundraisingGoal;
              teamRaised.value = data.sumDonations;
            }

            currentTimeout = setTimeout(update, POLL_INTERVAL);
            lockPoll = false;
          });
        } else {
          currentTimeout = setTimeout(update, POLL_INTERVAL);
          lockPoll = false;
        }
      });
    });
  }
};