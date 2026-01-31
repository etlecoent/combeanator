import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type CoffeesTable = {
	coffee_id: Generated<number>;
	name: ColumnType<string>;
	created_at: ColumnType<Date, string | undefined, never>;
};

export type Coffee = Selectable<CoffeesTable>;
export type CreateCoffee = Insertable<CoffeesTable>;
export type UpdateCoffee = Updateable<CoffeesTable>;
