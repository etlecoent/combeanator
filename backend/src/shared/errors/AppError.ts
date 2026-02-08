/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public code?: string
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * 400 Bad Request - General validation or bad request error
 */
export class BadRequestError extends AppError {
	constructor(message = 'Bad request', code = 'BAD_REQUEST') {
		super(400, message, code);
	}
}

/**
 * 400 Bad Request - Validation error (e.g., from Zod)
 */
export class ValidationError extends AppError {
	constructor(message = 'Validation failed', code = 'VALIDATION_ERROR') {
		super(400, message, code);
	}
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends AppError {
	constructor(message = 'Unauthorized', code = 'UNAUTHORIZED') {
		super(401, message, code);
	}
}

/**
 * 403 Forbidden - Authenticated but not authorized
 */
export class ForbiddenError extends AppError {
	constructor(message = 'Forbidden', code = 'FORBIDDEN') {
		super(403, message, code);
	}
}

/**
 * 404 Not Found - Resource not found
 */
export class NotFoundError extends AppError {
	constructor(message = 'Resource not found', code = 'NOT_FOUND') {
		super(404, message, code);
	}
}

/**
 * 409 Conflict - Resource conflict (e.g., duplicate entry)
 */
export class ConflictError extends AppError {
	constructor(message = 'Resource conflict', code = 'CONFLICT') {
		super(409, message, code);
	}
}

/**
 * 500 Internal Server Error - General server error
 */
export class InternalServerError extends AppError {
	constructor(message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR') {
		super(500, message, code);
	}
}
