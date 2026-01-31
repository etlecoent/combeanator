// Generate a a zod validation against the env
import { z } from 'zod';

const envSchema = z.object({
	VITE_API_URL: z.string().url(),
	VITE_APP_NAME: z.string().min(1),
	VITE_APP_ENV: z.enum(['development', 'production', 'test']),
});

const ENV = envSchema.parse(import.meta.env);

export type ENV = z.infer<typeof envSchema>;
export default ENV;
