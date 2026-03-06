import { createClient } from 'redis';
import ENV from '../config.js';

import redisLogger from './logger.js';

export const createRedisClient = async (name = '') => {
	const client = createClient({ url: `redis://${ENV.REDIS_HOST}:${ENV.REDIS_PORT}` });

	client.on('error', (err) => redisLogger.error(err, `Redis Client ${name} error`));
	client.on('connect', () => redisLogger.info(`Redis Client ${name} connected`));
	client.on('reconnecting', () => redisLogger.warn(`Redis Client ${name} reconnecting`));
	client.on('end', () => redisLogger.info(`Redis Client ${name} disconnected`));

	await client.connect();
	return client;
};
