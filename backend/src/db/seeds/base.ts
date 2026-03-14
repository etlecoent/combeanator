import type { Kysely } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: seeds should be frozen in time
export async function seed(db: Kysely<any>): Promise<void> {
	// Seed users
	await db
		.insertInto('users')
		.values([
			{ first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', gender: 'man' },
			{ first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', gender: 'woman' },
			{ first_name: 'Alex', last_name: 'Rider', email: 'alex.rider@example.com', gender: 'other' },
		])
		.execute();

	// Seed countries
	await db
		.insertInto('countries')
		.values([
			{ name: 'Brazil', iso_code_a3: 'BRA' },
			{ name: 'Colombia', iso_code_a3: 'COL' },
			{ name: 'Ethiopia', iso_code_a3: 'ETH' },
			{ name: 'Kenya', iso_code_a3: 'KEN' },
			{ name: 'Vietnam', iso_code_a3: 'VNM' },
			{ name: 'Indonesia', iso_code_a3: 'IDN' },
		])
		.execute();

	// Seed roasters
	await db
		.insertInto('roasters')
		.values([
			{ name: 'Blue Bottle Coffee' },
			{ name: 'Stumptown Coffee Roasters' },
			{ name: 'Intelligentsia Coffee' },
			{ name: 'Counter Culture Coffee' },
		])
		.execute();

	// Seed coffees
	await db
		.insertInto('coffees')
		.values([
			{ name: 'Sweet Apple', roaster_id: 1 },
			{ name: 'Dark Genius', roaster_id: 2 },
			{ name: 'Light Sleep', roaster_id: 3 },
			{ name: 'Hammer', roaster_id: 4 },
			{ name: 'Fruit Punch', roaster_id: 1 },
		])
		.execute();

	// Seed coffees_countries junction table
	await db
		.insertInto('coffees_countries')
		.values([
			{ coffee_id: 1, country_id: 1 },
			{ coffee_id: 1, country_id: 2 },
			{ coffee_id: 1, country_id: 3 },
			{ coffee_id: 2, country_id: 5 },
			{ coffee_id: 2, country_id: 6 },
			{ coffee_id: 3, country_id: 1 },
			{ coffee_id: 3, country_id: 4 },
			{ coffee_id: 4, country_id: 2 },
			{ coffee_id: 5, country_id: 3 },
		])
		.execute();
}
