import {formatDollars} from '../../shared/utils.js';

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="amount"></span>
`;

const yourGoalRep = nodecg.Replicant('your-goal', {defaultValue: 0});
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes');

export default class GbGraphicStreamGoal extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const amountSpan = shadowRoot.getElementById('amount');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		yourGoalRep.on('change', newVal => {
			amountSpan.textContent = formatDollars(newVal, {cents: false});
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.streamTotal}px`;
			}
		});
	}
}

customElements.define('gb-stream-goal', GbGraphicStreamGoal);
