"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const donationsRep = nodecg.Replicant('donations');
nodecg.listenFor('rejectDonation', (donationID, callback) => {
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
nodecg.listenFor('unrejectDonation', (donationID, callback) => {
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
nodecg.listenFor('approveDonation', (donationID, callback) => {
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
nodecg.listenFor('unapproveDonation', (donationID, callback) => {
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
function findDonationIndexById(donationID, array) {
    return array.findIndex((donation) => {
        return donation.donationID === donationID;
    });
}
//# sourceMappingURL=moderation.js.map