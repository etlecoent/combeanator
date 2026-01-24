import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type UsersTable = {
	id: Generated<number>;
	first_name: string;
	last_name: string | null;
	gender: 'man' | 'woman' | 'other';
	created_at: ColumnType<Date, string | undefined, never>;
};
export type User = Selectable<UsersTable>;
export type CreateUser = Insertable<UsersTable>;
export type UpdateUser = Updateable<UsersTable>;
