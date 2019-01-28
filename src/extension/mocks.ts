'use strict';

// Packages
import * as extralifeMock from 'extra-life-api-mock';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';

const nodecg = nodecgApiContext.get();

nodecg.listenFor('insertDonation', () => {
	nodecg.log.info('Inserting Mock Donation');
	extralifeMock.addDonation(); // tslint:disable-line:no-unsafe-any
});
