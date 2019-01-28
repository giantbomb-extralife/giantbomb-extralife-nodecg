// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {TimerValue} from '../../types/schemas/timerValue';
import {TimerDisplayValue} from '../../types/schemas/timerDisplayValue';
import {TimerPaused} from '../../types/schemas/timerPaused';
import {TimerNegative} from '../../types/schemas/timerNegative';

const nodecg = nodecgApiContext.get();
nodecg.log.info('Creating countdown timer');

const timerValueRep = nodecg.Replicant<TimerValue>('timerValue');
const timerDisplayValueRep = nodecg.Replicant<TimerDisplayValue>('timerDisplayValue');
const timerPausedRep = nodecg.Replicant<TimerPaused>('timerPaused');
const timerNegativeRep = nodecg.Replicant<TimerNegative>('timerNegative');
let timerStartPoint = -1;
let timerInterval: NodeJS.Timeout | undefined;

timerPausedRep.value = true;

function startTimer(): void {
	timerStartPoint = Date.now();
	timerPausedRep.value = false;

	if (timerInterval) {
		clearInterval(timerInterval);
	}

	nodecg.log.info('Starting Timer');
	timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer(): void {
	timerPausedRep.value = true;

	nodecg.log.info('Stopping Timer');
	if (timerInterval) {
		clearInterval(timerInterval);
	}

	timerValueRep.value = timerDisplayValueRep.value;

	if (timerNegativeRep.value) {
		timerValueRep.value = timerValueRep.value * -1;
	}
}

function updateTimer(): void {
	if (!timerStartPoint) {
		return;
	}

	const tempValue = timerValueRep.value - ((Date.now() - timerStartPoint) / 1000);

	if (tempValue < 0) {
		timerNegativeRep.value = true;
		timerDisplayValueRep.value = tempValue * -1;
	} else {
		timerNegativeRep.value = false;
		timerDisplayValueRep.value = tempValue;
	}
}

nodecg.listenFor('setTimer', (time: number) => {
	stopTimer();
	timerValueRep.value = time;
	timerDisplayValueRep.value = time < 0 ? (time * -1) : time;
	timerNegativeRep.value = time < 0;
});

nodecg.listenFor('startTimer', () => {
	startTimer();
});

nodecg.listenFor('stopTimer', () => {
	stopTimer();
});

process.on('exit', () => {
	stopTimer();
});
