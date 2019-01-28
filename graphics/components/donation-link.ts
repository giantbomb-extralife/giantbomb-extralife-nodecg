import {DonationLinkTextColor} from '../../types/schemas/donation-link-text-color';
import {DonationLink} from '../../types/schemas/donation-link';
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
	
	<span id="link"></span>
`;
/* tslint:enable:no-trailing-whitespace */

const donationLinkRep = nodecg.Replicant<DonationLink>('donation-link');
const donationLinkTextColorRep = nodecg.Replicant<DonationLinkTextColor>('donation-link-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbGraphicDonationLink extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const linkSpan = shadowRoot.getElementById('link') as HTMLSpanElement;
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		donationLinkRep.on('change', (newVal: DonationLink) => {
			linkSpan.textContent = newVal;
		});

		donationLinkTextColorRep.on('change', (newVal: DonationLinkTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.donationLink}px`;
			}
		});
	}
}

customElements.define('gb-donation-link', GbGraphicDonationLink);
