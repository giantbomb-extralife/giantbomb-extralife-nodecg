const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="link"></span>
`;

const donationLinkRep = nodecg.Replicant('donation-link');
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes', {
	defaultValue: {
		gameName: 24,
		nextGame: 10,
		streamName: 18,
		donationLink: 18,
		timer: 26,
		streamRaised: 24,
		streamTotal: 24,
		teamRaised: 24,
		teamTotal: 24,
		donations: 18
	}
});

export default class GbGraphicDonationLink extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const linkSpan = shadowRoot.getElementById('link');
		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		donationLinkRep.on('change', function(newVal) {
			linkSpan.textContent = newVal;
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.fontSize = `${newVal.timer}px`;
			}
		});
	}
}

customElements.define('gb-donation-link', GbGraphicDonationLink);
