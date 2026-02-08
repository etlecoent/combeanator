import type { NextFunction, Request, Response } from 'express';
import type { z } from 'zod';

/**
 * Middleware factory to validate request params
 * Stores parsed result in res.locals.params
 */
export const validateParams = <T>(schema: z.ZodSchema<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			res.locals.params = schema.parse(req.params);
			next();
		} catch (error) {
			next(error);
		}
	};
};

/**
 * Middleware factory to validate request body
 * Stores parsed result in res.locals.body
 */
export const validateBody = <T>(schema: z.ZodSchema<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			res.locals.body = schema.parse(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};
};

/**
 * Middleware factory to validate request query
 * Stores parsed result in res.locals.query
 */
export const validateQuery = <T>(schema: z.ZodSchema<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			res.locals.query = schema.parse(req.query);
			next();
		} catch (error) {
			next(error);
		}
	};
};

/**
 * Helper type that extracts the inferred type from a Zod schema
 * If T is a Zod schema, returns its inferred type, otherwise returns T as-is
 */
type InferSchema<T> = T extends z.ZodType<infer U> ? U : T;

/**
 * Typed Response with validated locals
 * Pass Zod schema types directly (e.g., typeof mySchema)
 *
 * @example
 * const handler = async (
 *   req: Request,
 *   res: ValidatedResponseLocals<typeof idSchema, typeof querySchema>,
 *   next: NextFunction
 * ) => {
 *   const { id } = res.locals.params; // Fully typed!
 * }
 */
export type ValidatedResponseLocals<
	TParams = unknown,
	TQuery = unknown,
	TBody = unknown,
> = Response<
	unknown,
	{
		params: InferSchema<TParams>;
		query: InferSchema<TQuery>;
		body: InferSchema<TBody>;
	}
>;
