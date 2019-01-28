import {formatDollars} from '../../shared/utils.js';
import {YourRaised} from '../../types/schemas/your-raised';
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

const yourRaisedRep = nodecg.Replicant<YourRaised>('your-raised');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicStreamRaised extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const amountSpan = shadowRoot.getElementById('amount') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		yourRaisedRep.on('change', (newVal: YourRaised) => {
			amountSpan.textContent = formatDollars(newVal);
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.streamRaised}px`;
			}
		});
	}
}

customElements.define('gb-stream-raised', GbGraphicStreamRaised);
