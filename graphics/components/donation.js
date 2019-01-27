import {clone} from '../../shared/utils.js';

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			word-break: break-word;
			word-wrap: break-word;
  			height: var(--donation-height, auto);
  			line-height: var(--donation-line-height, 1.5em);
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
  		#name {
			float: left;
			font-size: var(--donation-name-font-size, 18px);
			max-width: var(--donation-name-max-width, 200px);
			overflow: hidden;
			white-space: nowrap;
  		}
  		
  		#amount {
			color: #00e1ff;
			float: right;
			font-size: var(--donation-amount-font-size, 18px);
  		}
  		
		#message { 
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			box-sizing: border-box;
			clear: both;
			display: var(--donation-message-display, -webkit-box);
			font-size: var(--donation-message-font-size, 12px);
			line-height: 1.2em;
			margin: 0 auto;
			max-height: 3em;
			opacity: 0.5;
			overflow: hidden;
			padding-left: var(--donation-message-padding-left, 10px);
			text-align: initial;
			text-overflow: ellipsis;
			width: 100%;
		}
	</style>
	
	<div>
		<span id="name"></span>
		<span id="amount"></span>
		<span id="message"></span>
	</div>
`;

const donationAmountTextColor = nodecg.Replicant('donation-amount-text-color', {defaultValue: '#00e1ff'});
donationAmountTextColor.setMaxListeners(50);

export default class GbGraphicDonation extends HTMLElement {
	constructor(donation) {
		super();

		this._handleDonationAmountTextColorChanged = this._handleDonationAmountTextColorChanged.bind(this);

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		// Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
		this.donation = clone(donation);

		shadowRoot.getElementById('name').textContent = donation.displayName || 'Anonymous';
		shadowRoot.getElementById('amount').textContent = donation.amount;
		shadowRoot.getElementById('message').textContent = donation.message || '';
	}

	connectedCallback() {
		if (super.connectedCallback) {
			super.connectedCallback();
		}

		donationAmountTextColor.on('change', this._handleDonationAmountTextColorChanged);

		// Double rAF required for correct timing.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.style.opacity = '1';
			});
		});
	}

	disconnectedCallback() {
		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}

		donationAmountTextColor.removeListener('change', this._handleDonationAmountTextColorChanged);
	}

	_handleDonationAmountTextColorChanged(newVal) {
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
		if (ignoreReplicantStyles) {
			return;
		}
		this.shadowRoot.getElementById('amount').style.color = newVal;
	}
}

customElements.define('gb-donation', GbGraphicDonation);
