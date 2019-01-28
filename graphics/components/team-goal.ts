import {formatDollars} from '../../shared/utils.js';
import {TeamGoal} from '../../types/schemas/team-goal';
import {ComponentTextColor} from '../../types/schemas/component-text-color';
import {FontSizes} from '../../types/schemas/font-sizes';

/* tslint:disable:no-trailing-whitespace */
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
/* tslint:enable:no-trailing-whitespace */

const teamGoalRep = nodecg.Replicant<TeamGoal>('team-goal');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicTeamGoal extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const amountSpan = shadowRoot.getElementById('amount') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		teamGoalRep.on('change', (newVal: TeamGoal) => {
			amountSpan.textContent = formatDollars(newVal, {cents: false});
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.teamTotal}px`;
			}
		});
	}
}

customElements.define('gb-team-goal', GbGraphicTeamGoal);
