'use strict';

// NodeCG injects the '$bundle' variable, which is a jQuery selector targeting all of our bundle's panels.
// To target one specific panel within our bundle, we can use '.filter()'.
var $panel = $bundle.filter('.info');

var extraLifeId = nodecg.Replicant('extralife-id', { defaultValue: '' });
var extraLifeTeamId = nodecg.Replicant('extralife-team-id', { defaultValue: '' });

extraLifeId.on('change', function(oldValue, newValue) {
	$('#extralife_id').val(newValue);
});
extraLifeTeamId.on('change', function(oldValue, newValue) {
	$('#extralife_team_id').val(newValue);
});


$panel.find('.ctrl-update').on('click', function(e) {
	e.preventDefault();
	extraLifeId.value = $('#extralife_id').val();
	extraLifeTeamId.value = $('#extralife_team_id').val();
  $('#info-success').fadeIn().delay(500).fadeOut();
});