import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { db } from '../db/connection.js';

const coffeesRouter = Router();

coffeesRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await db.selectFrom('coffees').selectAll().execute();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

export default coffeesRouter;
