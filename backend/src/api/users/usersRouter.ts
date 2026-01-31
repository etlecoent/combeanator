import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { db } from '../../db/connection.js';

const usersRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await db.selectFrom('users').selectAll().execute();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

export default usersRouter;
