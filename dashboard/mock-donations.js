'use strict';

const insertDonationBtn = document.getElementById('insert-donation-btn');
const insert10DonationBtn = document.getElementById('insert-10-donation-btn');
const insert100DonationBtn = document.getElementById('insert-100-donation-btn');

insertDonationBtn.addEventListener('click', function () {
	nodecg.sendMessage('insertDonation');

	document.getElementById('controls-success').auto();
});

insert10DonationBtn.addEventListener('click', function () {
	for(let i = 0; i < 10; i++) {
		nodecg.sendMessage('insertDonation');
	}

	document.getElementById('controls-success').auto();
});

insert100DonationBtn.addEventListener('click', function () {
	for(let i = 0; i < 100; i++) {
		nodecg.sendMessage('insertDonation');
	}

	document.getElementById('controls-success').auto();
});
