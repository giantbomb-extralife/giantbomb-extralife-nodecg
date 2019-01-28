"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodecgApiContext = require("./util/nodecg-api-context");
module.exports = (nodecg) => {
    nodecgApiContext.set(nodecg);
    try {
        require('./scraper');
    }
    catch (e) {
        nodecg.log.error('Failed to load "scraper" lib:', e);
        process.exit(1);
    }
    try {
        require('./timer');
    }
    catch (e) {
        nodecg.log.error('Failed to load "timer" lib:', e);
        process.exit(1);
    }
    require('./mocks.js');
};
//# sourceMappingURL=index.js.map