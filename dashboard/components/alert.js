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

	async auto() {
		this.show();
		await sleep(600);
		this.hide();
	}

	show() {
		this.setAttribute('shown', 'true');
	}

	hide() {
		this.removeAttribute('shown');
	}
}

function sleep(milliseconds) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, milliseconds)
	});
}

customElements.define('gb-alert', GbAlert);
