import { z } from 'zod';

import { db } from '../db/connection.js';
import { createRedisClient } from '../redis_client/connection.js';
import rootLogger from '../shared/logger.js';

const logger = rootLogger.child({ name: 'coffeesIngestion' });

const coffeeIngestV1Schema = z.object({
	name: z.string(),
});

const QUEUE = 'coffees:ingest:v1' as const;

const processCoffee = async (rawCoffee: string) => {
	let unsafeCoffee: unknown;
	try {
		unsafeCoffee = JSON.parse(rawCoffee);
	} catch (err) {
		logger.error({ err, rawCoffee }, 'Error parsing coffee from queue');
		return;
	}

	const result = coffeeIngestV1Schema.safeParse(unsafeCoffee);
	if (!result.success) {
		logger.error({ rawCoffee, error: result.error }, 'Invalid coffee format');
		return;
	}

	const coffee = result.data;

	try {
		const existingCoffee = await db
			.selectFrom('coffees')
			.selectAll()
			.where('name', '=', coffee.name)
			.executeTakeFirst();

		if (!existingCoffee) {
			await db.insertInto('coffees').values(coffee).execute();
			logger.info({ coffee }, 'Inserted new coffee into database');
		} else {
			// TODO: Update coffee if it already exists, for now we just log it
			logger.info({ coffee }, 'Coffee already exists, should update it');
		}
	} catch (err) {
		logger.error({ err, coffee }, 'Error inserting/updating coffee in database');
	}
};

export const startCoffeesIngestion = async () => {
	let closed = false;

	const redisClient = await createRedisClient('coffeesIngestion');

	const close = async () => {
		if (closed) return;
		closed = true;
		logger.info('Closing Coffees Ingestion client');
		await redisClient.quit();
		logger.info('Coffees Ingestion closed');
	};

	// Start to pop the queue
	(async () => {
		logger.info('Starting Coffees Ingestion loop');
		while (!closed) {
			try {
				const item = await redisClient.blPop(QUEUE, 0);
				const rawCoffee = item?.element;
				if (rawCoffee) await processCoffee(rawCoffee);
			} catch (err) {
				if (closed) break;
				logger.error({ err }, 'Unexpected error in coffees ingestion loop');
			}
		}
	})();

	return { close };
};
