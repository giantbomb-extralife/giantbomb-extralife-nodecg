'use strict';

// Ours
import GbAlert from './components/alert';

const insertDonationBtn = document.getElementById('insert-donation-btn') as HTMLButtonElement;
const insert10DonationBtn = document.getElementById('insert-10-donation-btn') as HTMLButtonElement;
const insert100DonationBtn = document.getElementById('insert-100-donation-btn') as HTMLButtonElement;
const successAlert = document.getElementById('controls-success') as GbAlert;

insertDonationBtn.addEventListener('click', () => {
	nodecg.sendMessage('insertDonation');
	successAlert.auto();
});

insert10DonationBtn.addEventListener('click', () => {
	for (let i = 0; i < 10; i++) {
		nodecg.sendMessage('insertDonation');
	}

	successAlert.auto();
});

insert100DonationBtn.addEventListener('click', () => {
	for (let i = 0; i < 100; i++) {
		nodecg.sendMessage('insertDonation');
	}

	successAlert.auto();
});
