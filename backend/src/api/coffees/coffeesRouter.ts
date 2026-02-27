import type { Request } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/connection.js';
import { ConflictError, NotFoundError } from '../../shared/errors/AppError.js';
import {
	type ValidatedResponseLocals,
	validateBody,
	validateParams,
	validateQuery,
} from '../../shared/middlewares/validateMiddleware.js';
import { sendSuccess } from '../../shared/utils/response.js';

const coffeesRouter: Router = Router();

// Schemas
const searchQuerySchema = z.object({
	q: z.string().trim().optional(),
});

const createCoffeeSchema = z.object({
	name: z.string().trim(),
});

const coffeeIdSchema = z.object({
	id: z.coerce.number(),
});

coffeesRouter.get(
	'/',
	validateQuery(searchQuerySchema),
	async (_req: Request, res: ValidatedResponseLocals<unknown, typeof searchQuerySchema>) => {
		const { q: searchQuery } = res.locals.query;

		// Query building
		let query = db.selectFrom('coffees').selectAll();
		if (searchQuery) {
			query = query.where('name', 'ilike', `%${searchQuery}%`);
		}
		const coffees = await query.execute();
		sendSuccess(res, coffees);
	}
);

coffeesRouter.post(
	'/',
	validateBody(createCoffeeSchema),
	async (
		_req: Request,
		res: ValidatedResponseLocals<unknown, unknown, typeof createCoffeeSchema>
	) => {
		const { name } = res.locals.body;

		// Validate duplicates
		const existingCoffees = await db
			.selectFrom('coffees')
			.selectAll()
			.where('name', '=', name)
			.execute();

		if (existingCoffees.length !== 0) throw new ConflictError();

		// Insertion
		const result = await db
			.insertInto('coffees')
			.values({ name })
			.returning(['coffee_id', 'name', 'created_at'])
			.executeTakeFirstOrThrow();
		sendSuccess(res, result);
	}
);

coffeesRouter
	.route('/:id')
	.all(validateParams(coffeeIdSchema))
	.get(async (_req: Request, res: ValidatedResponseLocals<typeof coffeeIdSchema>) => {
		const { id } = res.locals.params;
		const coffee = await db
			.selectFrom('coffees')
			.selectAll()
			.where('coffee_id', '=', id)
			.executeTakeFirst();
		if (!coffee) throw new NotFoundError();
		sendSuccess(res, coffee);
	})
	// .put(validateBody(updateCoffeeSchema), async (req, res, next) => {
	//   const { id } = res.locals.params;
	//   const payload = res.locals.body;
	//   ...
	// })
	.delete(async (_req: Request, res: ValidatedResponseLocals<typeof coffeeIdSchema>) => {
		const { id } = res.locals.params;
		const deleteResult = await db.deleteFrom('coffees').where('coffee_id', '=', id).execute();
		if (deleteResult.length === 0) throw new NotFoundError();
		sendSuccess(res, null, 204);
	});

export default coffeesRouter;
