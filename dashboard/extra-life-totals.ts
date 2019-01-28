'use strict';

// Ours
import {formatDollars} from '../shared/utils.js';
import {TeamGoal} from '../types/schemas/team-goal';
import {TeamRaised} from '../types/schemas/team-raised';
import {YourGoal} from '../types/schemas/your-goal';
import {YourRaised} from '../types/schemas/your-raised';

const teamGoalRep = nodecg.Replicant<TeamGoal>('team-goal');
const teamRaisedRep = nodecg.Replicant<TeamRaised>('team-raised');
const yourGoalRep = nodecg.Replicant<YourGoal>('your-goal');
const yourRaisedRep = nodecg.Replicant<YourRaised>('your-raised');

teamGoalRep.on('change', (newValue: TeamGoal) => {
	(document.getElementById('teamGoal') as HTMLSpanElement).textContent = formatDollars(newValue);
});

teamRaisedRep.on('change', (newValue: TeamRaised) => {
	(document.getElementById('teamRaised') as HTMLSpanElement).textContent = formatDollars(newValue);
});

yourGoalRep.on('change', (newValue: YourGoal) => {
	(document.getElementById('yourGoal') as HTMLSpanElement).textContent = formatDollars(newValue);
});

yourRaisedRep.on('change', (newValue: YourRaised) => {
	(document.getElementById('yourRaised') as HTMLSpanElement).textContent = formatDollars(newValue);
});
