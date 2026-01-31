import { Kysely } from 'kysely';
import { dialect } from './interface.js';
import type { CoffeesTable } from './types/coffee.js';
import type { CoffeesCountriesTable } from './types/coffee_country.js';
import type { CountriesTable } from './types/country.js';
import type { UsersTable } from './types/user.js';

export type Database = {
	users: UsersTable;
	coffees: CoffeesTable;
	countries: CountriesTable;
	coffees_countries: CoffeesCountriesTable;
};

export const db = new Kysely<Database>({
	dialect,
});
