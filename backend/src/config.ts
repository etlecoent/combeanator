// Generate a a zod validation against the env
import { z } from 'zod';

const envSchema = z.object({
	// Server Configuration
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z.coerce.number().positive().int(),

	// Database Configuration
	POSTGRES_HOST: z.string().min(1),
	POSTGRES_PORT: z.coerce.number().positive().int(),
	POSTGRES_USER: z.string().min(1),
	POSTGRES_PASSWORD: z.string().min(1),
	POSTGRES_DB: z.string().min(1),
	POSTGRES_SCHEMA: z.string().min(1).default('public'),

	// CORS Configuration
	CORS_ORIGIN: z.string().url(),
});

const ENV = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
export default ENV;
