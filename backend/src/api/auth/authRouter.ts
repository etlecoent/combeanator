import bcrypt from 'bcrypt';
import type { Request } from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import ENV from '../../config.js';
import { db } from '../../db/connection.js';
import { UnauthorizedError } from '../../shared/errors/AppError.js';
import {
	type ValidatedResponseLocals,
	validateBody,
} from '../../shared/middlewares/validateMiddleware.js';
import { sendSuccess } from '../../shared/utils/response.js';

const authRouter: Router = Router();

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

authRouter.post(
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

export default authRouter;
