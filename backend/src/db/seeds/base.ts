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

	// Seed coffees
	await db
		.insertInto('coffees')
		.values([
			{ name: 'Arabica' },
			{ name: 'Robusta' },
			{ name: 'Bourbon' },
			{ name: 'Typica' },
			{ name: 'Gesha' },
		])
		.execute();

	// Seed coffees_countries junction table
	await db
		.insertInto('coffees_countries')
		.values([
			{ coffee_id: 1, country_id: 1 }, // Arabica - Brazil
			{ coffee_id: 1, country_id: 2 }, // Arabica - Colombia
			{ coffee_id: 1, country_id: 3 }, // Arabica - Ethiopia
			{ coffee_id: 2, country_id: 5 }, // Robusta - Vietnam
			{ coffee_id: 2, country_id: 6 }, // Robusta - Indonesia
			{ coffee_id: 3, country_id: 1 }, // Bourbon - Brazil
			{ coffee_id: 3, country_id: 4 }, // Bourbon - Kenya
			{ coffee_id: 4, country_id: 2 }, // Typica - Colombia
			{ coffee_id: 5, country_id: 3 }, // Gesha - Ethiopia
		])
		.execute();
}
