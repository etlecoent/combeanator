import type { Kysely } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('coffees').addColumn('description', 'text').execute();
}

// biome-ignore lint/suspicious/noExplicitAny: migrations should be frozen in time
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('coffees').dropColumn('description').execute();
}
