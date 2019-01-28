'use strict';

// Ours
import {CurrentGame} from '../types/schemas/current-game';
import {NextGame} from '../types/schemas/next-game';
import {StreamName} from '../types/schemas/stream-name';
import {DonationLink} from '../types/schemas/donation-link';
import {TimerDisplayValue} from '../types/schemas/timerDisplayValue';
import {TimerPaused} from '../types/schemas/timerPaused';
import {TimerNegative} from '../types/schemas/timerNegative';
import GbAlert from './components/alert';

const currentGameRep = nodecg.Replicant<CurrentGame>('current-game');
const nextGameRep = nodecg.Replicant<NextGame>('next-game');
const streamNameRep = nodecg.Replicant<StreamName>('stream-name');
const donationLinkRep = nodecg.Replicant<DonationLink>('donation-link');
const timerDisplayValueRep = nodecg.Replicant<TimerDisplayValue>('timerDisplayValue');
const timerPausedRep = nodecg.Replicant<TimerPaused>('timerPaused');
const timerNegativeRep = nodecg.Replicant<TimerNegative>('timerNegative');

const timerStartBtn = document.getElementById('timer-start') as HTMLButtonElement;
const timerPauseBtn = document.getElementById('timer-pause') as HTMLButtonElement;
const gameNameInput = document.getElementById('game-name') as HTMLInputElement;
const nextGameNameInput = document.getElementById('next-game-name') as HTMLInputElement;
const streamNameInput = document.getElementById('stream-name') as HTMLInputElement;
const donationLinkInput = document.getElementById('donation-link') as HTMLInputElement;
const timerInput = document.getElementById('timer') as HTMLInputElement;
const adjustTimerBtn = document.getElementById('adjust-timer-btn') as HTMLButtonElement;
const adjustTimerInput = document.getElementById('adjust-timer') as HTMLInputElement;
const gameUpdateBtn = document.getElementById('game-update') as HTMLButtonElement;
const successAlert = document.getElementById('controls-success') as GbAlert;

const numeral = (window as any).numeral;

currentGameRep.on('change', (newValue: CurrentGame) => {
	gameNameInput.value = newValue;
});

nextGameRep.on('change', (newValue: NextGame) => {
	nextGameNameInput.value = newValue;
});

streamNameRep.on('change', (newValue: StreamName) => {
	streamNameInput.value = newValue;
});

donationLinkRep.on('change', (newValue: DonationLink) => {
	donationLinkInput.value = newValue;
});

timerNegativeRep.on('change', (newValue: TimerNegative) => {
	const tm = timerInput.value;
	if (newValue && tm.length > 0 && tm[0] !== '-') {
		timerInput.value = '-' + tm;
	} else if (!newValue && tm.length > 0 && tm[0] === '-') {
		timerInput.value = tm.slice(1);
	}
});

timerDisplayValueRep.on('change', (newValue: TimerDisplayValue) => {
	let time = numeral(newValue).format('00:00:00') as string; // tslint:disable-line:no-unsafe-any
	if (timerNegativeRep.value) {
		time = '-' + time;
	}

	timerInput.value = time;
});

timerPausedRep.on('change', (newValue: TimerPaused) => {
	if (newValue) {
		timerPauseBtn.setAttribute('hidden', 'true');
		timerStartBtn.removeAttribute('hidden');
	} else {
		timerPauseBtn.removeAttribute('hidden');
		timerStartBtn.setAttribute('hidden', 'true');
	}
});

gameUpdateBtn.addEventListener('click', () => {
	streamNameRep.value = streamNameInput.value;
	currentGameRep.value = gameNameInput.value;
	nextGameRep.value = nextGameNameInput.value;
	donationLinkRep.value = donationLinkInput.value;
	successAlert.auto();
});

timerStartBtn.addEventListener('click', () => {
	nodecg.sendMessage('startTimer');
	// Also send the "Make sure the team widget knows this is running signal"
});

timerPauseBtn.addEventListener('click', () => {
	nodecg.sendMessage('stopTimer');
});

adjustTimerBtn.addEventListener('click', () => {
	const foo = adjustTimerInput.value;
	nodecg.sendMessage('setTimer', numeral().unformat(foo) as number); // tslint:disable-line:no-unsafe-any
});
