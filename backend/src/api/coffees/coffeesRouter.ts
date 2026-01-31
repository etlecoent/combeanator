import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/connection.js';

const coffeesRouter: Router = Router();

coffeesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Validation
		const searchQuerySchema = z.object({
			q: z.string().trim().optional(),
		});
		const { q: searchQuery } = searchQuerySchema.parse(req.query);

		// Query building
		let query = db.selectFrom('coffees').selectAll();
		if (searchQuery) {
			query = query.where('name', 'ilike', `%${searchQuery}%`);
		}
		const coffees = await query.execute();
		res.status(200).json(coffees);
	} catch (error) {
		next(error);
	}
});

export default coffeesRouter;
