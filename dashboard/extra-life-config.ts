'use strict';

// Ours
import GbAlert from './components/alert';
import {ExtralifeId} from '../types/schemas/extralife-id';
import {ExtralifeTeamId} from '../types/schemas/extralife-team-id';

const extraLifeIdRep = nodecg.Replicant<ExtralifeId>('extralife-id');
const extraLifeTeamIdRep = nodecg.Replicant<ExtralifeTeamId>('extralife-team-id');

const extraLifeIdInput = document.getElementById('extralife_id') as HTMLInputElement;
const extraLifeTeamIdInput = document.getElementById('extralife_team_id') as HTMLInputElement;

extraLifeIdRep.on('change', (newValue: ExtralifeId) => {
	extraLifeIdInput.value = String(newValue);
});

extraLifeTeamIdRep.on('change', (newValue: ExtralifeTeamId) => {
	extraLifeTeamIdInput.value = String(newValue);
});

(document.getElementById('update') as HTMLButtonElement).addEventListener('click', () => {
	extraLifeIdRep.value = extraLifeIdInput.value;
	extraLifeTeamIdRep.value = extraLifeTeamIdInput.value;
	(document.getElementById('info-success') as GbAlert).auto();
});
