import {ShowDonationComments} from '../../types/schemas/show-donation-comments';
import {ComponentTextColor} from '../../types/schemas/component-text-color';
import {FontSizes} from '../../types/schemas/font-sizes';
import GbGraphicDonation from './donation.js';
import BaseDonationList from '../../shared/components/base-donation-list.js';

/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>  		
  		:host([hide-comments]) .donation {
  			--donation-message-display: none;
  		}
	</style>
`;
/* tslint:enable:no-trailing-whitespace */

const showDonationCommentsRep = nodecg.Replicant<ShowDonationComments>('show-donation-comments');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbDonationsList extends BaseDonationList {
	donationItemElementTag = 'gb-donation'; // tslint:disable-line:typedef
	donationItemElementClass = GbGraphicDonation; // tslint:disable-line:typedef

	constructor() {
		super();

		this.shadowRoot!.appendChild(shadowTemplate.content.cloneNode(true));

		showDonationCommentsRep.on('change', (newValue: ShowDonationComments) => {
			if (newValue === false) {
				this.setAttribute('hide-comments', '');
			} else {
				this.removeAttribute('hide-comments');
			}
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!this._ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!this._ignoreReplicantStyles) {
				this.style.setProperty('--donation-name-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-amount-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-message-font-size', `${newVal.donations * (2 / 3)}px`);
			}
		});
	}
}

customElements.define('gb-donations-list', GbDonationsList);
