// Ours
import {sleep} from '../../shared/utils.js';

/* tslint:disable:no-trailing-whitespace */
const template = document.createElement('template');
template.innerHTML = `
	<style>
		:host {
  			border: 1px solid transparent;
  			bottom: 0;
  			cursor: pointer;
  			left: 0;
  			opacity: 1;
  			padding: 15px;
  			position: absolute;
  			transition: opacity 150ms ease-in-out;
  			width: 100%;
  			will-change: opacity;
  			z-index: 100;
  		}
  		
  		:host(:not([shown])) {
  			opacity: 0;
  			pointer-events: none;
  		}
  		
  		/* Styles for other alert types can be added later if needed. */
  		:host([type="success"]) {
			background-color: #43ac6a;
			border-color: #3c9a5f;
			color: #ffffff;
  		}
	</style>
	
	<slot></slot>
`;
/* tslint:enable:no-trailing-whitespace */

export default class GbAlert extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(template.content.cloneNode(true));

		// Dismiss the alert when clicked.
		this.addEventListener('click', () => {
			this.hide();
		});
	}

	async auto(): Promise<void> {
		this.show();
		await sleep(600);
		this.hide();
	}

	show(): void {
		this.setAttribute('shown', 'true');
	}

	hide(): void {
		this.removeAttribute('shown');
	}
}

customElements.define('gb-alert', GbAlert);
