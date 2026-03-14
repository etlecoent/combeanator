import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type CoffeesCountriesTable = {
	coffees_countries_id: Generated<number>;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined>;
	deleted_at: ColumnType<Date, string | undefined>;
	coffee_id: ColumnType<number>;
	country_id: ColumnType<number>;
};

export type Coffee = Selectable<CoffeesCountriesTable>;
export type CreateCoffee = Insertable<CoffeesCountriesTable>;
export type UpdateCoffee = Updateable<CoffeesCountriesTable>;
