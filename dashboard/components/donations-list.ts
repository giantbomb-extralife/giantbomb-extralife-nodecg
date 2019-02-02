import GbDashboardDonation from './donation.js';
import BaseDonationList from '../../shared/components/base-donation-list.js';

/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>

	<slot></slot>
`;
/* tslint:enable:no-trailing-whitespace */

export default class GbDonationsList extends BaseDonationList {
	donationItemElementTag = 'gb-donation'; // tslint:disable-line:typedef
	donationItemElementClass = GbDashboardDonation; // tslint:disable-line:typedef

	constructor() {
		super();

		this.shadowRoot!.appendChild(shadowTemplate.content.cloneNode(true));
	}
}

customElements.define('gb-donations-list', GbDonationsList);
