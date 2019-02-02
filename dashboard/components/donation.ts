// Ours
import {Donation, Donations} from '../../types/schemas/donations';
import BaseDonationItem from '../../shared/components/base-donation-item.js';

/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			border-radius: 4px;
			display: flex;
			margin-bottom: 8px;
			overflow: hidden;
  			flex: none;
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
  		:host(:last-child) {
			margin-bottom: 0;
		}
  		
		::slotted(.donation) {
			border-radius: 0 !important;
			color: black;
			flex: 1;
			word-break: break-word;
			word-wrap: break-word;
		}
		
		::slotted(button) {
			display: flex !important;
			flex-direction: column;
			border: none !important;
			border-radius: 0 !important;
			width: 70px;
			font-weight: bold !important;
			justify-content: center;
			align-items: center;
		}
	</style>
	
	<slot></slot>
`;

const lightTemplate = document.createElement('template');
lightTemplate.innerHTML = `		
	<button class="donation__reject btn btn-danger">
		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
		<span>Reject</span>
	</button>
	
	<div class="donation list-group-item">
		<h4 class="donation__body list-group-item-heading" style="float: left;"></h4>
		<p class="donation__timestamp list-group-item-heading" style="float: right;"></p>
		<p class="donation__message list-group-item-text" style="clear: both;"></p>
	</div>
	
	<button class="donation__accept btn btn-success">
		<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
		<span>Accept</span>
	</button>
`;
/* tslint:enable:no-trailing-whitespace */

const TIMESTAMP_UPDATE_INTERVAL_TIME = 1000;
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const rtf = new (Intl as any).RelativeTimeFormat('en', {  // tslint:disable-line:no-unsafe-any
	style: 'narrow',
	numeric: 'auto'
});

export default class GbDashboardDonation extends BaseDonationItem {
	private _timestampUpdateInterval: any;

	constructor(donation: Donation, feed: keyof Donations) {
		super(donation, feed);

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		// Use Light DOM, so that the bootstrap styles can be applied.
		this.appendChild(lightTemplate.content.cloneNode(true));
		(this.querySelector('.donation__body') as HTMLHeadingElement).textContent = (donation.displayName || 'Anonymous') + (donation.amount ? (' - ' + donation.amount) : '');
		(this.querySelector('.donation__message') as HTMLParagraphElement).textContent = donation.message || '';
		this.updateTimestamp();

		const rejectBtn = this.querySelector('.donation__reject') as HTMLButtonElement;
		const acceptBtn = this.querySelector('.donation__accept') as HTMLButtonElement;

		if (feed === 'rejected') {
			rejectBtn.remove();
		} else {
			rejectBtn.addEventListener('click', () => {
				switch (feed) {
					case 'pending':
						nodecg.sendMessage('rejectDonation', this.donation.donorID);
						break;
					case 'approved':
						nodecg.sendMessage('unapproveDonation', this.donation.donorID);
						break;
					default:
					// Do nothing.
				}
			});
		}

		if (feed === 'approved') {
			acceptBtn.remove();
		} else {
			acceptBtn.addEventListener('click', () => {
				switch (feed) {
					case 'rejected':
						nodecg.sendMessage('unrejectDonation', this.donation.donorID);
						break;
					case 'pending':
						nodecg.sendMessage('approveDonation', this.donation.donorID);
						break;
					default:
					// Do nothing.
				}
			});
		}
	}

	connectedCallback(): void {
		this.style.opacity = '1';
		this._timestampUpdateInterval = setInterval(() => {
			this.updateTimestamp();
		}, TIMESTAMP_UPDATE_INTERVAL_TIME); // tslint:disable-line:align
	}

	disconnectedCallback(): void {
		clearInterval(this._timestampUpdateInterval); // tslint:disable-line:no-unsafe-any
	}

	updateTimestamp(): void {
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

		// tslint:disable-next-line:no-unsafe-any
		(this.querySelector('.donation__timestamp') as HTMLParagraphElement).textContent = rtf.format(Math.round(amount), unit);
	}
}

customElements.define('gb-donation', GbDashboardDonation);
