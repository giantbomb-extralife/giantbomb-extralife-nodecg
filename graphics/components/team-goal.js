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

const teamGoalRep = nodecg.Replicant('team-goal', {defaultValue: 0});
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes');

export default class GbGraphicTeamGoal extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const amountSpan = shadowRoot.getElementById('amount');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		teamGoalRep.on('change', newVal => {
			amountSpan.textContent = formatDollars(newVal, {cents: false});
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.teamTotal}px`;
			}
		});
	}
}

customElements.define('gb-team-goal', GbGraphicTeamGoal);
