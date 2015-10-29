'use strict';

// NodeCG injects the '$bundle' variable, which is a jQuery selector targeting all of our bundle's panels.
// To target one specific panel within our bundle, we can use '.filter()'.
var $panel = $bundle.filter('.data');

var teamGoal = nodecg.Replicant('team-goal', { defaultValue: 0 });
var teamRaised = nodecg.Replicant('team-raised', { defaultValue: 0 });
var yourGoal = nodecg.Replicant('your-goal', { defaultValue: 0 });
var yourRaised = nodecg.Replicant('your-raised', { defaultValue: 0 });

teamGoal.on('change', function(oldValue, newValue) {
  $('#teamGoal').text(numeral(newValue).format('$0,0.00'));
});

teamRaised.on('change', function(oldValue, newValue) {
  $('#teamRaised').text(numeral(newValue).format('$0,0.00'));
});
yourGoal.on('change', function(oldValue, newValue) {
  $('#yourGoal').text(numeral(newValue).format('$0,0.00'));
});
yourRaised.on('change', function(oldValue, newValue) {
  $('#yourRaised').text(numeral(newValue).format('$0,0.00'));
});