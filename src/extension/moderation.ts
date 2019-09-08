// Ours
import {Donation, Donations} from '../../types/schemas/donations';
import * as nodecgApiContext from './util/nodecg-api-context';
import {ListenForCb} from '../../types/nodecg';

const nodecg = nodecgApiContext.get();
const donationsRep = nodecg.Replicant<Donations>('donations');

nodecg.listenFor('rejectDonation', (donationID: string, callback: ListenForCb) => {
	const donationIndex = findDonationIndexById(donationID, donationsRep.value.pending);
	if (donationIndex < 0) {
		if (callback && !callback.handled) {
			callback(new Error('Could not find donation'));
		}
		return;
	}

	const rejectedDonation = donationsRep.value.pending.splice(donationIndex, 1)[0];
	donationsRep.value.rejected.push(rejectedDonation);
});

nodecg.listenFor('unrejectDonation', (donationID: string, callback: ListenForCb) => {
	const donationIndex = findDonationIndexById(donationID, donationsRep.value.rejected);
	if (donationIndex < 0) {
		if (callback && !callback.handled) {
			callback(new Error('Could not find donation'));
		}
		return;
	}

	const unrejectedDonation = donationsRep.value.rejected.splice(donationIndex, 1)[0];
	donationsRep.value.pending.push(unrejectedDonation);
});

nodecg.listenFor('approveDonation', (donationID: string, callback: ListenForCb) => {
	const donationIndex = findDonationIndexById(donationID, donationsRep.value.pending);
	if (donationIndex < 0) {
		if (callback && !callback.handled) {
			callback(new Error('Could not find donation'));
		}
		return;
	}

	const approvedDonation = donationsRep.value.pending.splice(donationIndex, 1)[0];
	donationsRep.value.approved.push(approvedDonation);
});

nodecg.listenFor('unapproveDonation', (donationID: string, callback: ListenForCb) => {
	const donationIndex = findDonationIndexById(donationID, donationsRep.value.approved);
	if (donationIndex < 0) {
		if (callback && !callback.handled) {
			callback(new Error('Could not find donation'));
		}
		return;
	}

	const unapprovedDonation = donationsRep.value.approved.splice(donationIndex, 1)[0];
	donationsRep.value.pending.push(unapprovedDonation);
});

function findDonationIndexById(donationID: string, array: Donation[]): number {
	return array.findIndex((donation: Donation) => {
		return donation.donationID === donationID;
	});
}
