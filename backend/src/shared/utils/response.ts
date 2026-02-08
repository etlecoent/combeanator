import type { Response } from 'express';

/**
 * Standard success response format
 */
interface SuccessResponse<T> {
	success: true;
	data: T;
}

/**
 * Standard error response format
 */
export interface ErrorResponse {
	success: false;
	error: {
		message: string;
		code?: string;
	};
}

/**
 * Send a standardized success response
 * @param res - Express response object
 * @param data - Response data
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = <T>(res: Response, data: T, statusCode = 200): void => {
	const response: SuccessResponse<T> = {
		success: true,
		data,
	};
	res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @param code - Optional error code
 */
export const sendError = (
	res: Response,
	message: string,
	statusCode: number,
	code?: string
): void => {
	const response: ErrorResponse = {
		success: false,
		error: {
			message,
			...(code && { code }),
		},
	};
	res.status(statusCode).json(response);
};
