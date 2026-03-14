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
	query: z.string().trim().optional(),
	page: z.coerce.number().positive(),
	size: z.coerce.number().positive().min(10).max(10),
});

const createCoffeeSchema = z.object({
	name: z.string().trim(),
	roaster_id: z.number().positive(),
});

const coffeeIdSchema = z.object({
	id: z.coerce.number(),
});

coffeesRouter.get(
	'/',
	validateQuery(searchQuerySchema),
	async (_req: Request, res: ValidatedResponseLocals<unknown, typeof searchQuerySchema>) => {
		const { query: searchQuery, page, size } = res.locals.query;

		let baseQuery = db.selectFrom('coffees');
		if (searchQuery) {
			baseQuery = baseQuery.where('name', 'ilike', `%${searchQuery}%`);
		}

		const [coffees, countResult] = await Promise.all([
			baseQuery
				.selectAll()
				.offset((page - 1) * size)
				.limit(size)
				.execute(),
			baseQuery
				.select(({ fn }) => fn.count<number>('coffee_id').as('total'))
				.executeTakeFirstOrThrow(),
		]);

		sendSuccess({ res, data: coffees, pagination: { total: countResult.total, page, size } });
	}
);

coffeesRouter.post(
	'/',
	validateBody(createCoffeeSchema),
	async (
		_req: Request,
		res: ValidatedResponseLocals<unknown, unknown, typeof createCoffeeSchema>
	) => {
		const { name, roaster_id } = res.locals.body;

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
			.values({ name, roaster_id })
			.returning(['coffee_id', 'name', 'created_at'])
			.executeTakeFirstOrThrow();
		sendSuccess({ res, data: result });
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
		sendSuccess({ res, data: coffee });
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
		sendSuccess({ res, data: null, statusCode: 204 });
	});

export default coffeesRouter;
