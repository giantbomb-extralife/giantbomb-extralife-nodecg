'use strict';

import {formatDollars} from '../shared/utils.js';

const teamGoalRep = nodecg.Replicant('team-goal', {defaultValue: 0});
const teamRaisedRep = nodecg.Replicant('team-raised', {defaultValue: 0});
const yourGoalRep = nodecg.Replicant('your-goal', {defaultValue: 0});
const yourRaisedRep = nodecg.Replicant('your-raised', {defaultValue: 0});

teamGoalRep.on('change', function (newValue) {
	document.getElementById('teamGoal').textContent = formatDollars(newValue);
});

teamRaisedRep.on('change', function (newValue) {
	document.getElementById('teamRaised').textContent = formatDollars(newValue);
});

yourGoalRep.on('change', function (newValue) {
	document.getElementById('yourGoal').textContent = formatDollars(newValue);
});

yourRaisedRep.on('change', function (newValue) {
	document.getElementById('yourRaised').textContent = formatDollars(newValue);
});
