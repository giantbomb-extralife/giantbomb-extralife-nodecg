const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="name"></span>
`;

const streamNameRep = nodecg.Replicant('stream-name');
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes');

export default class GbGraphicStreamName extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const nameSpan = shadowRoot.getElementById('name');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		streamNameRep.on('change', newVal => {
			nameSpan.textContent = newVal;
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.streamName}px`;
			}
		});
	}
}

customElements.define('gb-stream-name', GbGraphicStreamName);
