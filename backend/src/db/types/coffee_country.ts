import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type CoffeesCountriesTable = {
	coffees_countries_id: Generated<number>;
	coffee_id: ColumnType<number>;
	country_id: ColumnType<number>;
	created_at: ColumnType<Date, string | undefined, never>;
};

export type Coffee = Selectable<CoffeesCountriesTable>;
export type CreateCoffee = Insertable<CoffeesCountriesTable>;
export type UpdateCoffee = Updateable<CoffeesCountriesTable>;
