"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
nodecg.log.info('Creating countdown timer');
const timerValueRep = nodecg.Replicant('timerValue');
const timerDisplayValueRep = nodecg.Replicant('timerDisplayValue');
const timerPausedRep = nodecg.Replicant('timerPaused');
const timerNegativeRep = nodecg.Replicant('timerNegative');
let timerStartPoint = -1;
let timerInterval;
timerPausedRep.value = true;
function startTimer() {
    timerStartPoint = Date.now();
    timerPausedRep.value = false;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    nodecg.log.info('Starting Timer');
    timerInterval = setInterval(updateTimer, 1000);
}
function stopTimer() {
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
function updateTimer() {
    if (!timerStartPoint) {
        return;
    }
    const tempValue = timerValueRep.value - ((Date.now() - timerStartPoint) / 1000);
    if (tempValue < 0) {
        timerNegativeRep.value = true;
        timerDisplayValueRep.value = tempValue * -1;
    }
    else {
        timerNegativeRep.value = false;
        timerDisplayValueRep.value = tempValue;
    }
}
nodecg.listenFor('setTimer', (time) => {
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
//# sourceMappingURL=timer.js.map