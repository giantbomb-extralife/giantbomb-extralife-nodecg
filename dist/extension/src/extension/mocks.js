'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const extralifeMock = require("extra-life-api-mock");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
nodecg.listenFor('insertDonation', () => {
    nodecg.log.info('Inserting Mock Donation');
    extralifeMock.addDonation(); // tslint:disable-line:no-unsafe-any
});
//# sourceMappingURL=mocks.js.map