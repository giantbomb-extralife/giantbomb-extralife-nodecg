// Packages
import {clone} from '../../shared/utils.js';

// Ours
import {Donation} from '../../types/schemas/donations';

export default class BaseDonationItem extends HTMLElement {
	readonly donation: Donation;

	constructor(donation: Donation) {
		super();

		// Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
		this.donation = clone(donation);
	}
}
