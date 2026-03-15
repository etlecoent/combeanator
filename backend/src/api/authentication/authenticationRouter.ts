import bcrypt from 'bcrypt';
import type { Request } from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import ENV from '../../config.js';
import { db } from '../../db/connection.js';
import { UnauthorizedError, ValidationError } from '../../shared/errors/AppError.js';
import {
	type ValidatedResponseLocals,
	validateBody,
} from '../../shared/middlewares/validateMiddleware.js';
import { sendSuccess } from '../../shared/utils/response.js';

const authenticationRouter: Router = Router();

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

authenticationRouter.post(
	'/login',
	validateBody(loginSchema),
	async (_req: Request, res: ValidatedResponseLocals<unknown, unknown, typeof loginSchema>) => {
		const { email, password } = res.locals.body;

		const user = await db
			.selectFrom('users')
			.selectAll()
			.where('email', '=', email)
			.where('deleted_at', 'is', null)
			.executeTakeFirst();

		const passwordMatch = user ? await bcrypt.compare(password, user.password_hash) : false;

		if (!user || !passwordMatch) throw new UnauthorizedError('Invalid credentials');

		const token = jwt.sign({ user_id: user.user_id, email: user.email }, ENV.JWT_SECRET, {
			expiresIn: ENV.JWT_EXPIRES_IN_SECONDS,
		});

		sendSuccess({ res, data: { token } });
	}
);

const registerSchema = z
	.object({
		first_name: z.string().min(1),
		last_name: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(15),
		confirm_password: z.string().min(15),
		gender: z.enum(['man', 'woman', 'other']),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password'],
	});

authenticationRouter.post(
	'/register',
	validateBody(registerSchema),
	async (_req: Request, res: ValidatedResponseLocals<unknown, unknown, typeof registerSchema>) => {
		const { first_name, last_name, email, password, gender } = res.locals.body;

		const existingUser = await db
			.selectFrom('users')
			.selectAll()
			.where('email', '=', email)
			.where('deleted_at', 'is', null)
			.executeTakeFirst();

		if (existingUser) {
			throw new ValidationError('Email already in use');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		await db
			.insertInto('users')
			.values({
				first_name,
				last_name,
				email,
				password_hash: passwordHash,
				gender,
			})
			.execute();

		sendSuccess({ res, data: { message: 'User registered successfully' } });
	}
);

export default authenticationRouter;
