// Ours
import {NodeCG} from '../../types/nodecg';
import * as nodecgApiContext from './util/nodecg-api-context';

module.exports = (nodecg: NodeCG): void => {
	nodecgApiContext.set(nodecg);

	try {
		require('./scraper');
	} catch (e) {
		nodecg.log.error('Failed to load "scraper" lib:', e);
		process.exit(1);
	}

	try {
		require('./timer');
	} catch (e) {
		nodecg.log.error('Failed to load "timer" lib:', e);
		process.exit(1);
	}

	require('./mocks.js');
};
