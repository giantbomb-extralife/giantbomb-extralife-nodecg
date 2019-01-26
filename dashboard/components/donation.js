import {clone} from '../../shared/utils.js';

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
		
		::slotted(.donation) {
			color: black;
			word-break: break-word;
			word-wrap: break-word;
		}
	</style>
	
	<slot></slot>
`;

const lightTemplate = document.createElement('template');
lightTemplate.innerHTML = `	
	<div class="donation list-group-item">
		<h4 class="donation__body list-group-item-heading" style="float: left;"></h4>
		<p class="donation__timestamp list-group-item-heading" style="float: right;"></p>
		<p class="donation__message list-group-item-text" style="clear: both;"></p>
	</div>
`;

const TIMESTAMP_UPDATE_INTERVAL_TIME = 1000;
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const rtf = new Intl.RelativeTimeFormat('en', {
	style: 'narrow',
	numeric: 'auto'
});

export default class GbDashboardDonation extends HTMLElement {
	constructor(donation) {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		// Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
		this.donation = clone(donation);

		// Use Light DOM, so that the bootstrap styles can be applied.
		this.appendChild(lightTemplate.content.cloneNode(true));
		this.querySelector('.donation__body').textContent = (donation.displayName || 'Anonymous') + (donation.amount ? (' - ' + donation.amount) : '');
		this.querySelector('.donation__message').textContent = donation.message || '';
		this.updateTimestamp();
	}

	connectedCallback() {
		if (super.connectedCallback) {
			super.connectedCallback();
		}

		this.style.opacity = '1';
		this._timestampUpdateInterval = setInterval(() => {
			this.updateTimestamp();
		}, TIMESTAMP_UPDATE_INTERVAL_TIME)
	}

	disconnectedCallback() {
		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}

		clearInterval(this._timestampUpdateInterval);
	}

	updateTimestamp() {
		if (!this.donation) {
			return;
		}

		const donationTimestamp = Date.parse(this.donation.createdDateUTC);
		const millisecondsSinceDonation = donationTimestamp - Date.now();
		const absoluteMilliseconds = Math.abs(millisecondsSinceDonation);
		let amount = millisecondsSinceDonation / 1000;

		let unit = 'second';
		if (absoluteMilliseconds >= ONE_DAY) {
			unit = 'day';
			amount = millisecondsSinceDonation / ONE_DAY;
		} else if (absoluteMilliseconds >= ONE_HOUR) {
			unit = 'hour';
			amount = millisecondsSinceDonation / ONE_HOUR;
		} else if (absoluteMilliseconds >= ONE_MINUTE) {
			unit = 'minute';
			amount = millisecondsSinceDonation / ONE_MINUTE;
		}

		this.querySelector('.donation__timestamp').textContent = rtf.format(Math.round(amount), unit);
	}
}

customElements.define('gb-donation', GbDashboardDonation);
