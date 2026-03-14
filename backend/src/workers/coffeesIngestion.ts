import { z } from 'zod';

import { db } from '../db/connection.js';
import { createRedisClient } from '../redis_client/connection.js';
import rootLogger from '../shared/logger.js';
import { up } from '../db/migrations/1769268881423_create_base.js';

const logger = rootLogger.child({ name: 'coffeesIngestion' });

const coffeeIngestV1Schema = z.object({
	name: z.string().trim(),
	roaster: z.string().trim(),
});
type CoffeeIngestV1 = z.infer<typeof coffeeIngestV1Schema>;

const QUEUE = 'coffees:ingest:v1' as const;

const parseRawCoffee = (rawCoffee: string) => {
	logger.info({ rawCoffee }, 'Parsing raw coffee from queue');
	const unsafeCoffee = JSON.parse(rawCoffee);
	const coffee = coffeeIngestV1Schema.parse(unsafeCoffee);

	return coffee;
};

type UpsertRoasterInput = { name: string };
const upsertRoaster = async (roaster: UpsertRoasterInput) => {
	logger.info({ roaster }, 'Upserting roaster');

	let dbRoaster = await db
		.selectFrom('roasters')
		.selectAll()
		.where('name', '=', roaster.name)
		.executeTakeFirst();

	if (!dbRoaster) {
		const [newRoaster] = await db.insertInto('roasters').values(roaster).returningAll().execute();
		dbRoaster = newRoaster;
		logger.info({ roaster: newRoaster }, 'Created new roaster');
	} else {
		const [updatedRoaster] = await db
			.updateTable('roasters')
			.set({ name: roaster.name, updated_at: new Date() })
			.where('roaster_id', '=', dbRoaster.roaster_id)
			.returningAll()
			.execute();
		dbRoaster = updatedRoaster;
		logger.info({ roaster: dbRoaster }, 'Updated existing roaster');
	}

	return dbRoaster;
};
type UpsertCoffeeInput = { name: string; roaster_id: number };
const upsertCoffee = async (coffee: UpsertCoffeeInput) => {
	logger.info({ coffee }, 'Upserting coffee');

	let dbCoffee = await db
		.selectFrom('coffees')
		.selectAll()
		.where('name', '=', coffee.name)
		.executeTakeFirst();

	if (!dbCoffee) {
		const [newCoffee] = await db.insertInto('coffees').values(coffee).returningAll().execute();
		dbCoffee = newCoffee;
		logger.info({ coffee: newCoffee }, 'Created new coffee');
	} else {
		const [updatedCoffee] = await db
			.updateTable('coffees')
			.set({ name: coffee.name, updated_at: new Date() })
			.where('coffee_id', '=', dbCoffee.coffee_id)
			.returningAll()
			.execute();
		dbCoffee = updatedCoffee;
		logger.info({ coffee: dbCoffee }, 'Updated existing coffee');
	}

	return dbCoffee;
};

const processRawCoffee = async (rawCoffee: string) => {
	let coffee: CoffeeIngestV1 | null = null;
	try {
		coffee = parseRawCoffee(rawCoffee);
	} catch (err) {
		logger.error({ err, rawCoffee }, 'Error parsing raw coffee');
		return;
	}

	let roasterId: number | null = null;
	try {
		const roaster = await upsertRoaster({ name: coffee.roaster });
		roasterId = roaster.roaster_id;
	} catch (err) {
		logger.error({ err, roaster: coffee.roaster }, 'Error upserting roaster for coffee');
		return;
	}

	if (!roasterId) {
		logger.error({ roasterId }, 'No roaster ID after upsert, cannot proceed with coffee upsert');
		return;
	}
	try {
		await upsertCoffee({ name: coffee.name, roaster_id: roasterId });
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
				if (rawCoffee) await processRawCoffee(rawCoffee);
			} catch (err) {
				if (closed) break;
				logger.error({ err }, 'Unexpected error in coffees ingestion loop');
			}
		}
	})();

	return { close };
};
