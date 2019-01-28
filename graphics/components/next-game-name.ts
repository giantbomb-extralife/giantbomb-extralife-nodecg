import {NextGame} from '../../types/schemas/next-game';
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

const nextGameRep = nodecg.Replicant<NextGame>('next-game');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicNextGameName extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const nameSpan = shadowRoot.getElementById('name') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		nextGameRep.on('change', (newVal: NextGame) => {
			nameSpan.textContent = newVal;
			this.style.display = newVal.trim() ? 'block' : 'none';
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.nextGame}px`;
			}
		});
	}
}

customElements.define('gb-next-game-name', GbGraphicNextGameName);
