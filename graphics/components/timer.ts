import {TimerDisplayValue} from '../../types/schemas/timerDisplayValue';
import {TimerNegative} from '../../types/schemas/timerNegative';
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
	
	<span id="time"></span>
`;
/* tslint:enable:no-trailing-whitespace */

const numeral = (window as any).numeral;
const timerDisplayValueRep = nodecg.Replicant<TimerDisplayValue>('timerDisplayValue');
const timerNegativeRep = nodecg.Replicant<TimerNegative>('timerNegative');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicTimer extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const timeSpan = shadowRoot.getElementById('time') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		timerDisplayValueRep.on('change', (newVal: TimerDisplayValue) => {
			let time = numeral(newVal).format('00:00:00') as string; // tslint:disable-line:no-unsafe-any
			if (timerNegativeRep.value) {
				time = '-' + time;
			}

			timeSpan.textContent = time;
		});

		timerNegativeRep.on('change', (newVal: TimerNegative) => {
			const tm = timeSpan.textContent || '';
			if (newVal && tm.length > 0 && tm[0] !== '-') {
				timeSpan.textContent = '-' + tm;
			} else if (!newVal && tm.length > 0 && tm[0] === '-') {
				timeSpan.textContent = tm.slice(1);
			}
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.timer}px`;
			}
		});
	}
}

customElements.define('gb-timer', GbGraphicTimer);
