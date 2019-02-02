// Packages
import {clone} from '../../shared/utils.js';

// Ours
import {Donation, Donations} from '../../types/schemas/donations';

export default class BaseDonationItem extends HTMLElement {
	readonly donation: Donation;
	readonly feed: keyof Donations;

	constructor(donation: Donation, feed: keyof Donations) {
		super();

		// Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
		this.donation = clone(donation);

		this.feed = feed;
	}
}
