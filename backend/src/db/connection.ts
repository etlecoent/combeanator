import { Kysely } from 'kysely';
import { dialect } from './interface.js';
import type { UsersTable } from './types/user.js';

export type Database = {
	user: UsersTable;
};

export const db = new Kysely<Database>({
	dialect,
});
