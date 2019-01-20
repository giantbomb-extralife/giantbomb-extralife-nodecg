'use strict';

const extraLifeIdRep = nodecg.Replicant('extralife-id', {defaultValue: ''});
const extraLifeTeamIdRep = nodecg.Replicant('extralife-team-id', {defaultValue: ''});
const extraLifeIdInput = document.getElementById('extralife_id');
const extraLifeTeamIdInput = document.getElementById('extralife_team_id');

extraLifeIdRep.on('change', function (newValue) {
	extraLifeIdInput.value = newValue;
});

extraLifeTeamIdRep.on('change', function (newValue) {
	extraLifeTeamIdInput.value = newValue;
});

document.getElementById('update').addEventListener('click', function () {
	extraLifeIdRep.value = extraLifeIdInput.value;
	extraLifeTeamIdRep.value = extraLifeTeamIdInput.value;
	document.getElementById('info-success').auto();
});
