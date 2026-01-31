import type { Kysely } from 'kysely';
import { sql } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function up(db: Kysely<any>): Promise<void> {
	// Create users table
	await db.schema
		.createTable('users')
		.addColumn('user_id', 'serial', (col) => col.primaryKey())
		.addColumn('first_name', 'varchar(255)', (col) => col.notNull())
		.addColumn('last_name', 'varchar(255)', (col) => col.notNull())
		.addColumn('email', 'varchar(255)', (col) => col.unique().notNull())
		.addColumn('gender', 'varchar(10)', (col) =>
			col.notNull().check(sql`gender IN ('man', 'woman', 'other')`)
		)
		.addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
		.execute();

	await db.schema
		.createTable('coffees')
		.addColumn('coffee_id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.unique().notNull())
		.execute();

	await db.schema
		.createTable('countries')
		.addColumn('country_id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('iso_code_a3', 'char(3)', (col) => col.unique().notNull())
		.addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
		.execute();

	await db.schema
		.createTable('coffees_countries')
		.addColumn('coffees_countries_id', 'serial', (col) => col.primaryKey())
		.addColumn('coffee_id', 'integer', (col) =>
			col.references('coffees.coffee_id').onDelete('cascade').notNull()
		)
		.addColumn('country_id', 'integer', (col) =>
			col.references('countries.country_id').onDelete('cascade').notNull()
		)
		.addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('users').execute();
	await db.schema.dropTable('coffees').execute();
	await db.schema.dropTable('countries').execute();
	await db.schema.dropTable('coffees_countries').execute();
}
