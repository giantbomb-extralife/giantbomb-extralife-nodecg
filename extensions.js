'use strict';

module.exports = function(nodecg) {
    try {
        require('./scraper')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "scraper" lib:', e.stack);
        process.exit(1);
    }

    try {
        require('./timer')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "timer" lib:', e.stack);
        process.exit(1);
    }
};
