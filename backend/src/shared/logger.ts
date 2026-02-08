import pino from 'pino';

import ENV from '../config.js';

export default pino({
	name: 'express',
	level: ENV.NODE_ENV !== 'production' ? 'debug' : 'info',
	timestamp: pino.stdTimeFunctions.isoTime,
});
