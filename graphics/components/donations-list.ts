import {Donation, Donations} from '../../types/schemas/donations';
import {ShowDonationComments} from '../../types/schemas/show-donation-comments';
import {ComponentTextColor} from '../../types/schemas/component-text-color';
import {FontSizes} from '../../types/schemas/font-sizes';
import GbGraphicDonation from './donation.js';

/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>  		
  		:host([hide-comments]) .donation {
  			--donation-message-display: none;
  		}
	</style>
`;
/* tslint:enable:no-trailing-whitespace */

const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant<Donations>('donations');
const showDonationCommentsRep = nodecg.Replicant<ShowDonationComments>('show-donation-comments');
const componentTextColorRep = nodecg.Replicant<ComponentTextColor>('component-text-color');
const fontSizesRep = nodecg.Replicant<FontSizes>('font-sizes');

export default class GbDonationsList extends HTMLElement {
	private _initial = true; // tslint:disable-line:typedef
	private readonly _pollInterval = 30 * 10; // tslint:disable-line:typedef
	private readonly _ignoreReplicantStyles: boolean;

	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));

		const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
		this._ignoreReplicantStyles = ignoreReplicantStyles;

		showDonationCommentsRep.on('change', (newValue: ShowDonationComments) => {
			if (newValue === false) {
				this.setAttribute('hide-comments', '');
			} else {
				this.removeAttribute('hide-comments');
			}
		});

		donationsRep.on('change', (newValue: Donations) => {
			this.parseDonations(newValue);
		});

		componentTextColorRep.on('change', (newVal: ComponentTextColor) => {
			if (!ignoreReplicantStyles) {
				this.style.color = newVal;
			}
		});

		fontSizesRep.on('change', (newVal: FontSizes) => {
			if (!ignoreReplicantStyles) {
				this.style.setProperty('--donation-name-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-amount-font-size', `${newVal.donations}px`);
				this.style.setProperty('--donation-message-font-size', `${newVal.donations * (2 / 3)}px`);
			}
		});
	}

	parseDonations(donationsData: Donations): void {
		if (!donationsData) {
			return;
		}

		const newArray = donationsData.array;
		if (!Array.isArray(newArray)) {
			return;
		}

		if (newArray.length === 0) {
			this.shadowRoot!.querySelectorAll('gb-donation').forEach((donationElem: GbGraphicDonation) => {
				donationElem.remove();
			});
			this._initial = true;
		}

		let pass = false;
		const mostRecentDonationElement = this.shadowRoot!.querySelector('gb-donation') as GbGraphicDonation;
		const mostRecentShowingDonationId = mostRecentDonationElement ?
			mostRecentDonationElement.donation.donorID :
			undefined;
		const temporary = [];
		for (let i = newArray.length - 1; i >= 0; i--) {
			const donation = newArray[i];
			if (donation.donorID === mostRecentShowingDonationId || pass) {
				pass = true;
				continue;
			}

			temporary.unshift(donation);
		}

		let j = 0;
		let bucketCounter = 1;
		const intervals = (temporary.length > 0 && temporary.length <= this._pollInterval) ?
			Math.floor(this._pollInterval / temporary.length) : 1;
		const bucket = temporary.length > this._pollInterval ? Math.ceil(temporary.length / this._pollInterval) : 1;

		temporary.forEach((donation: Donation) => {
			if (this._initial) {
				this.createAndInsertDonationElement(donation);
			} else {
				setTimeout(() => {
					this.createAndInsertDonationElement(donation);
				}, j * intervals * 100); // tslint:disable-line:align
			}

			if ((bucketCounter % bucket) === 0) {
				j++;
			}

			bucketCounter++;
		});

		this._initial = false;
	}

	createAndInsertDonationElement(donation: Donation): void {
		// Create the new donation element.
		const donationElement = new GbGraphicDonation(donation);
		if (this._ignoreReplicantStyles) {
			donationElement.setAttribute('ignore-replicant-styles', '');
		}
		donationElement.classList.add('donation');

		// Insert it just after the <style> tag in our shadow root.
		// This will put it before all other elements.
		const styleElem = this.shadowRoot!.querySelector('style') as HTMLStyleElement;
		styleElem.insertAdjacentElement('afterend', donationElement);

		// Remove excess donation elements.
		const allDonationElements = Array.from(this.shadowRoot!.querySelectorAll('gb-donation'));
		const excessDonationElements = allDonationElements.slice(MAX_DONATIONS_TO_LIST);
		excessDonationElements.forEach((element: GbGraphicDonation) => {
			element.remove();
		});
	}
}

customElements.define('gb-donations-list', GbDonationsList);
