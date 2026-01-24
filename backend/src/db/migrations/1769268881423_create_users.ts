import type { Kysely } from 'kysely';
import { sql } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('user')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('first_name', 'varchar(255)', (col) => col.notNull())
		.addColumn('last_name', 'varchar(255)')
		.addColumn('gender', 'varchar(10)', (col) =>
			col.notNull().check(sql`gender IN ('man', 'woman', 'other')`),
		)
		.addColumn('created_at', 'timestamp', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
		)
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('user').execute();
}
