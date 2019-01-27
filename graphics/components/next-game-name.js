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

const nextGameRep = nodecg.Replicant('next-game');
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes');

export default class GbGraphicNextGameName extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const nameSpan = shadowRoot.getElementById('name');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		nextGameRep.on('change', newVal => {
			nameSpan.textContent = newVal;
			this.style.display = newVal.trim() ? 'block' : 'none';
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.nextGame}px`;
			}
		});
	}
}

customElements.define('gb-next-game-name', GbGraphicNextGameName);
