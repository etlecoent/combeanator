import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type CountriesTable = {
	country_id: Generated<number>;
	first_name: string;
	last_name: string;
	gender: 'man' | 'woman' | 'other';
	email: string;
	created_at: ColumnType<Date, string | undefined, never>;
};
export type User = Selectable<CountriesTable>;
export type CreateUser = Insertable<CountriesTable>;
export type UpdateUser = Updateable<CountriesTable>;
