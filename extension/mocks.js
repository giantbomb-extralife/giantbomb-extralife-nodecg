'use strict';

const extralifeMock = require('extra-life-api-mock');

module.exports = function (nodecg) {
	nodecg.listenFor('insertDonation', function () {
		nodecg.log.info('Inserting Mock Donation');
		extralifeMock.addDonation();
	});
};
