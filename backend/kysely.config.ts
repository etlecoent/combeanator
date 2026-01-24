import { Kysely } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { dialect } from './src/db/interface';

export default defineConfig({
	kysely: new Kysely({
		dialect,
	}),
	migrations: {
		migrationFolder: './src/db/migrations',
	},
	seeds: {
		seedFolder: './src/db/seeds',
	},
});
