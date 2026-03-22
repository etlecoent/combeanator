import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type CoffeesTable = {
	coffee_id: Generated<number>;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined>;
	deleted_at: ColumnType<Date, string | undefined>;
	name: ColumnType<string>;
	roaster_id: ColumnType<number>;
	description: ColumnType<string | null, string | undefined, string | undefined>;
};

export type Coffee = Selectable<CoffeesTable>;
export type CreateCoffee = Insertable<CoffeesTable>;
export type UpdateCoffee = Updateable<CoffeesTable>;
