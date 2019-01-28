import {CurrentGame} from '../../types/schemas/current-game';
import {ComponentTextColor} from '../../types/schemas/component-text-color';
import {FontSizes} from '../../types/schemas/font-sizes';

/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="name"></span>
`;
/* tslint:enable:no-trailing-whitespace */

const currentGameRep = nodecg.Replicant<CurrentGame>('current-game');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicGameName extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const nameSpan = shadowRoot.getElementById('name') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		currentGameRep.on('change', (newVal: CurrentGame) => {
			nameSpan.textContent = newVal;
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.gameName}px`;
			}
		});
	}
}

customElements.define('gb-game-name', GbGraphicGameName);
