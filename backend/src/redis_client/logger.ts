import logger from '../shared/logger.js';

const redisLogger = logger.child({ name: 'redis' });

export default redisLogger;
