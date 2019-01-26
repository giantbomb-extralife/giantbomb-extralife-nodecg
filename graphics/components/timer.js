const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="time"></span>
`;

const timerDisplayValueRep = nodecg.Replicant('timerDisplayValue', {defaultValue: 24 * 60 * 60});
const timerNegativeRep = nodecg.Replicant('timerNegative', {defaultValue: false});
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes', {
	defaultValue: {
		gameName: 24,
		nextGame: 10,
		streamName: 18,
		donationLink: 18,
		timer: 26,
		streamRaised: 24,
		streamTotal: 24,
		teamRaised: 24,
		teamTotal: 24,
		donations: 18
	}
});

export default class GbGraphicTimer extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const timeSpan = shadowRoot.getElementById('time');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		timerDisplayValueRep.on('change', newVal => {
			let time = numeral(newVal).format('00:00:00');
			if (timerNegativeRep.value) {
				time = '-' + time;
			}

			timeSpan.textContent = time;
		});

		timerNegativeRep.on('change', newVal => {
			const tm = timeSpan.textContent || '';
			if (newVal && tm.length > 0 && tm[0] !== '-') {
				timeSpan.textContent = '-' + tm;
			} else if (!newVal && tm.length > 0 && tm[0] === '-') {
				timeSpan.textContent = tm.slice(1);
			}
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.timer}px`;
			}
		});
	}
}

customElements.define('gb-timer', GbGraphicTimer);
