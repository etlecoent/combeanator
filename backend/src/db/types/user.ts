import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type UsersTable = {
	user_id: Generated<number>;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined>;
	deleted_at: ColumnType<Date, string | undefined>;
	first_name: string;
	last_name: string;
	gender: 'man' | 'woman' | 'other';
	email: string;
};
export type User = Selectable<UsersTable>;
export type CreateUser = Insertable<UsersTable>;
export type UpdateUser = Updateable<UsersTable>;
