import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import ENV from '../config.js';

export const dialect = new PostgresDialect({
	pool: new Pool({
		database: ENV.POSTGRES_DB,
		host: ENV.POSTGRES_HOST,
		user: ENV.POSTGRES_USER,
		password: ENV.POSTGRES_PASSWORD,
		port: ENV.POSTGRES_PORT,
		max: 10,
		options: `-c search_path=${ENV.POSTGRES_SCHEMA}`,
	}),
});
