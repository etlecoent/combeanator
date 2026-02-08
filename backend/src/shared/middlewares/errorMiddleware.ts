import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { NoResultError } from 'kysely';
import { ZodError } from 'zod';
import ENV from '../../config.js';
import { AppError } from '../errors/AppError.js';
import logger from '../logger.js';
import { sendError } from '../utils/response.js';

const errorMiddleware: ErrorRequestHandler = (
	err,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	// Handle custom AppError
	if (err instanceof AppError) {
		logger.warn({ err }, `${err.name}: ${err.message}`);
		return sendError(res, err.message, err.statusCode, err.code);
	}
	// Handle Zod validation errors
	if (err instanceof ZodError) {
		const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
		logger.warn({ err }, `Validation error: ${message}`);
		return sendError(res, message, 400, 'VALIDATION_ERROR');
	}

	// Handle Kysely not found error
	if (err instanceof NoResultError) {
		logger.warn({ err }, 'Database query returned no result');
		return sendError(res, 'Ressource not found', 404, 'NOT_FOUND');
	}

	// Handle unknown errors (log as error since these are unexpected)
	logger.error({ err }, 'Unexpected error occurred');

	// Don't expose internal error details in production
	const message =
		ENV.NODE_ENV === 'production'
			? 'An unexpected error occurred'
			: err.message || 'Something went wrong';

	return sendError(res, message, 500, 'INTERNAL_SERVER_ERROR');
};

export default errorMiddleware;
