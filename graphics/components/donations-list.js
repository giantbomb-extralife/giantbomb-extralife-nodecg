import GbGraphicDonation from './donation.js';

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>  		
  		:host(['hide-comments']) .donation {
  			--donation-message-display: none;
  		}
	</style>
`;

const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant('donations', {defaultValue: []});
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments', {defaultValue: true});
const componentTextColorRep = nodecg.Replicant('component-text-color', {defaultValue: '#ffffff'});
const fontSizesRep = nodecg.Replicant('font-sizes');

export default class GbDonationsList extends HTMLElement {
	constructor() {
		super();

		this._initial = true;
		this._pollInterval = (30 * 10);

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;

		showDonationCommentsRep.on('change', newValue => {
			if (newValue === false) {
				this.setAttribute('hide-comments', '');
			} else {
				this.removeAttribute('hide-comments');
			}
		});

		donationsRep.on('change', newValue => {
			this.parseDonations(newValue);
		});

		componentTextColorRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', newVal => {
			if (!ignoreReplicantStyles) {
				this.style.setProperty('--donation-name-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-amount-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-message-font-size', `${newVal.donations * (2 / 3)}px`);
			}
		});
	}

	parseDonations(donationsData) {
		if (!donationsData) {
			return;
		}

		const newArray = donationsData.array;
		if (!Array.isArray(newArray)) {
			return;
		}

		if (newArray.length === 0 || donationsData.clear) {
			this.shadowRoot.querySelectorAll('gb-donation').forEach(donationElem => {
				donationElem.remove();
			});
			this._initial = true;
		}

		let pass = false;
		const mostRecentDonationElement = this.shadowRoot.querySelector('gb-donation');
		const mostRecentShowingDonationId = mostRecentDonationElement ?
			mostRecentDonationElement.donation.id :
			null;
		const temporary = [];
		for (let i = newArray.length - 1; i >= 0; i--) {
			const donation = newArray[i];
			if (donation.id === mostRecentShowingDonationId || pass) {
				pass = true;
				continue;
			} else {
				temporary.unshift(donation);
			}
		}

		let j = 0;
		let bucketCounter = 1;
		const intervals = (temporary.length > 0 && temporary.length <= this._pollInterval) ?
			Math.floor(this._pollInterval / temporary.length) : 1;
		const bucket = temporary.length > this._pollInterval ? Math.ceil(temporary.length / this._pollInterval) : 1;

		temporary.forEach(donation => {
			if (this._initial) {
				this.createAndInsertDonationElement(donation);
			} else {
				setTimeout(() => {
					this.createAndInsertDonationElement(donation);
				}, j * intervals * 100);
			}

			if ((bucketCounter % bucket) === 0) {
				j++;
			}

			bucketCounter++;
		});

		this._initial = false;
	}

	createAndInsertDonationElement(donation) {
		// Create the new donation element.
		const donationElement = new GbGraphicDonation(donation);
		donationElement.classList.add('donation');

		// Insert it just after the <style> tag in our shadow root.
		// This will put it before all other elements.
		const styleElem = this.shadowRoot.querySelector('style');
		styleElem.insertAdjacentElement('afterend', donationElement);

		// Remove excess donation elements.
		const allDonationElements = Array.from(this.shadowRoot.querySelectorAll('gb-donation'));
		const excessDonationElements = allDonationElements.slice(MAX_DONATIONS_TO_LIST);
		excessDonationElements.forEach(element => element.remove());
	}
}

customElements.define('gb-donations-list', GbDonationsList);
