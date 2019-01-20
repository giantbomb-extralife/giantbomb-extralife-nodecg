'use strict';

const currentGameRep = nodecg.Replicant('current-game', {defaultValue: ''});
const nextGameRep = nodecg.Replicant('next-game', {defaultValue: ''});
const streamNameRep = nodecg.Replicant('stream-name', {defaultValue: ''});
const donationLinkRep = nodecg.Replicant('donation-link', {defaultValue: ''});
const timerDisplayValueRep = nodecg.Replicant('timerDisplayValue', {defaultValue: 24 * 60 * 60});
const timerPausedRep = nodecg.Replicant('timerPaused', {defaultValue: true});
const timerNegativeRep = nodecg.Replicant('timerNegative', {defaultValue: false});

const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const gameNameInput = document.getElementById('game-name');
const nextGameNameInput = document.getElementById('next-game-name');
const streamNameInput = document.getElementById('stream-name');
const donationLinkInput = document.getElementById('donation-link');
const timerInput = document.getElementById('timer');

currentGameRep.on('change', function (newValue) {
	gameNameInput.value = newValue;
});

nextGameRep.on('change', function (newValue) {
	nextGameNameInput.value = newValue;
});

streamNameRep.on('change', function (newValue) {
	streamNameInput.value = newValue;
});

donationLinkRep.on('change', function (newValue) {
	donationLinkInput.value = newValue;
});


timerNegativeRep.on('change', function (newValue) {
	const tm = timerInput.value;
	if (newValue && tm.length > 0 && tm[0] !== '-') {
		timerInput.value = '-' + tm;
	} else if (!newValue && tm.length > 0 && tm[0] === '-') {
		timerInput.value = tm.slice(1);
	}
});

timerDisplayValueRep.on('change', function (newValue) {
	let time = numeral(newValue).format('00:00:00');
	if (timerNegativeRep.value) {
		time = '-' + time;
	}

	timerInput.value = time;
});

timerPausedRep.on('change', function (newValue) {
	if (newValue) {
		timerPauseBtn.setAttribute('hidden', 'true');
		timerStartBtn.removeAttribute('hidden');
	} else {
		timerPauseBtn.removeAttribute('hidden');
		timerStartBtn.setAttribute('hidden', 'true');
	}
});

document.getElementById('game-update').addEventListener('click', function () {
	streamNameRep.value = streamNameInput.value;
	currentGameRep.value = gameNameInput.value;
	nextGameRep.value = nextGameNameInput.value;
	donationLinkRep.value = donationLinkInput.value;
	document.getElementById('controls-success').auto();
});

timerStartBtn.addEventListener('click', function () {
	nodecg.sendMessage('startTimer');
	// Also send the "Make sure the team widget knows this is running signal"
});

document.getElementById('timer-pause').addEventListener('click', function () {
	nodecg.sendMessage('stopTimer');
});

document.getElementById('adjust-timer-btn').addEventListener('click', function () {
	const foo = document.getElementById('adjust-timer').value;
	nodecg.sendMessage('setTimer', numeral().unformat(foo));
});

