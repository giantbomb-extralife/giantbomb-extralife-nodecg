// Ours
import {Donation, Donations} from '../../types/schemas/donations';
import BaseDonationItem from './base-donation-item';

const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant<Donations>('donations');

export default abstract class BaseDonationList extends HTMLElement {
	feed: keyof Donations = 'approved';
	abstract donationItemElementTag: string; // tslint:disable-line:typedef
	abstract donationItemElementClass: new (donation: Donation, feed: keyof Donations) => BaseDonationItem; // tslint:disable-line:typedef

	/**
	 * If true, ignores all styles from the fontSize and color Replicants.
	 */
	protected readonly _ignoreReplicantStyles: boolean;

	/**
	 * If true, slowly inserts new donations one-at-a-time, instead of all-at-once.
	 * The time between each insertion is determined based on how rapidly the donations are coming in.
	 */
	protected readonly _meteredInsertion: boolean;

	private _initial = true; // tslint:disable-line:typedef
	private readonly _pollInterval = 30 * 10; // tslint:disable-line:typedef
	private readonly _root: HTMLElement | ShadowRoot;

	protected constructor() {
		super();

		const feedAttributeValue = (this.getAttribute('feed') as keyof Donations);
		this.feed = feedAttributeValue || 'approved';

		this._ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
		this._meteredInsertion = this.getAttribute('metered-insertion') !== null;

		// Graphics will want to use Shadow DOM.
		// However, some Dashboard panels may want to use Light DOM, for Bootstrap styling.
		// This is how we support both.
		const useLightDom = this.getAttribute('use-light-dom') !== null;
		const shadowRoot = this.attachShadow({mode: 'open'});
		this._root = useLightDom ? this : shadowRoot;

		donationsRep.on('change', (newValue: Donations) => {
			this.parseDonations(newValue);
		});
	}

	parseDonations(donationsData: Donations): void {
		if (!donationsData) {
			return;
		}

		const newArray = donationsData[this.feed];
		if (!Array.isArray(newArray)) {
			return;
		}

		if (newArray.length === 0) {
			this.clearAllDonations();
		}

		this.removeExpiredDonations();

		// Create an array of donation which we don't already have in our list.
		let pass = false;
		const mostRecentDonationElement = this._root.querySelector(this.donationItemElementTag) as BaseDonationItem;
		const mostRecentShowingDonationId = mostRecentDonationElement ?
			mostRecentDonationElement.donation.donationID :
			undefined;
		const temporary = [];
		for (let i = newArray.length - 1; i >= 0; i--) {
			const donation = newArray[i];
			if (donation.donationID === mostRecentShowingDonationId || pass) {
				pass = true;
				continue;
			}

			temporary.unshift(donation);
		}

		// Insert the new donations into our list.
		let j = 0;
		let bucketCounter = 1;
		const intervals = (temporary.length > 0 && temporary.length <= this._pollInterval) ?
			Math.floor(this._pollInterval / temporary.length) : 1;
		const bucket = temporary.length > this._pollInterval ? Math.ceil(temporary.length / this._pollInterval) : 1;
		temporary.forEach((donation: Donation) => {
			// If this is the initial page load,
			// OR if the `metered-insertion` attribute is falsey,
			// insert all donations at once.
			//
			// ELSE, meter out the insertion of donations over time, to
			// give each donation a bit of time to be read.
			if (this._initial || !this._meteredInsertion) {
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

		this.limitDisplayedDonations();

		this._initial = false;
	}

	createAndInsertDonationElement(donation: Donation): void {
		// Create the new donation element.
		// When doing so, forward the ignore-replicant-styles attribute, if it has been set.
		const donationElement = new this.donationItemElementClass(donation, this.feed);
		if (this._ignoreReplicantStyles) {
			donationElement.setAttribute('ignore-replicant-styles', '');
		}

		// Check if our shadow root has a <style> tag.
		// If so, insert the new donation element immediately after that <style> tag.
		// Else, just insert the new donation element as the first element.
		//
		// The goal here is to always insert the new donation element before other
		// donation elements, but after any <style> tags.
		const styleElem = this._root.querySelector('style:last-of-type') as HTMLStyleElement;
		if (styleElem) {
			styleElem.insertAdjacentElement('afterend', donationElement);
		} else {
			this._root.prepend(donationElement);
		}
	}

	removeExpiredDonations(): void {
		if (!donationsRep.value) {
			return;
		}

		// Remove excess donation elements.
		const allDonationElements = Array.from(this._root.querySelectorAll(this.donationItemElementTag));
		const donationsInFeed = donationsRep.value[this.feed];

		allDonationElements.forEach((donationElement: BaseDonationItem) => {
			// Find this element's donation in our feed.
			const feedIndex = donationsInFeed.findIndex((donation: Donation) => {
				return donation.donationID === donationElement.donation.donationID;
			});

			// If this element's donation is not in our feed, we consider it "expired".
			// Remove it from the DOM.
			if (feedIndex < 0) {
				donationElement.remove();
			}
		});
	}

	limitDisplayedDonations(): void {
		const allDonationElements = Array.from(this._root.querySelectorAll(this.donationItemElementTag));
		const excessDonationElements = allDonationElements.slice(MAX_DONATIONS_TO_LIST);
		excessDonationElements.forEach((element: HTMLElement) => {
			element.remove();
		});
	}

	clearAllDonations(): void {
		this._root.querySelectorAll(this.donationItemElementTag).forEach((donationElem: BaseDonationItem) => {
			donationElem.remove();
		});
		this._initial = true;
	}
}
