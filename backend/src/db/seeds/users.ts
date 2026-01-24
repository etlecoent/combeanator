import type { Kysely } from 'kysely';

export async function seed(db: Kysely<any>): Promise<void> {
	await db
		.insertInto('user')
		.values([
			{ first_name: 'John', last_name: 'Doe', gender: 'man' },
			{ first_name: 'Jane', last_name: 'Smith', gender: 'woman' },
			{ first_name: 'Alex', last_name: null, gender: 'other' },
		])
		.execute();
}
