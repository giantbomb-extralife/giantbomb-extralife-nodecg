'use strict';

module.exports = function (nodecg) {
	nodecg.log.info('Creating countdown timer');

	const timerValueRep = nodecg.Replicant('timerValue', {defaultValue: 24 * 60 * 60});
	const timerDisplayValueRep = nodecg.Replicant('timerDisplayValue', {defaultValue: 24 * 60 * 60});
	const timerPausedRep = nodecg.Replicant('timerPaused', {defaultValue: true});
	const timerNegativeRep = nodecg.Replicant('timerNegative', {defaultValue: false});
	let timerStartPoint = -1;
	let timerInterval = null;

	timerPausedRep.value = true;

	const startTimer = function () {
		timerStartPoint = Date.now();
		timerPausedRep.value = false;

		if (timerInterval) {
			clearInterval(timerInterval);
		}

		nodecg.log.info('Starting Timer');
		timerInterval = setInterval(updateTimer, 1000);
	};

	const stopTimer = function () {
		timerPausedRep.value = true;

		nodecg.log.info('Stopping Timer');
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timerValueRep.value = timerDisplayValueRep.value;

		if (timerNegativeRep.value) {
			timerValueRep.value = timerValueRep.value * -1;
		}
	};

	const updateTimer = function () {
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
	};

	nodecg.listenFor('setTimer', function (time) {
		stopTimer();
		timerValueRep.value = time;
		timerDisplayValueRep.value = time < 0 ? (time * -1) : time;
		timerNegativeRep.value = time < 0;
	});

	nodecg.listenFor('startTimer', function () {
		startTimer();
	});


	nodecg.listenFor('stopTimer', function () {
		stopTimer();
	});

	process.on('exit', function () {
		stopTimer();
	})
};
