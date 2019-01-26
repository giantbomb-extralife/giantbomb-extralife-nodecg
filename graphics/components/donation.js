import {clone} from '../../shared/utils.js';

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			word-break: break-word;
			word-wrap: break-word;
  			line-height: 1.5em;
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
			font-size: var(--donation-name-font-size, 18px);
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

export default class GbGraphicDonation extends HTMLElement {
	constructor(donation) {
		super();

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

		// Double rAF required for correct timing.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.style.opacity = '1';
			});
		});
	}
}

customElements.define('gb-donation', GbGraphicDonation);