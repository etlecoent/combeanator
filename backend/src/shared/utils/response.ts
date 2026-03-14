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

type SendSuccessParams<T> = {
	res: Response;
	data: T;
	pagination?: {
		page: number;
		total: number;
		size: number;
	};
	statusCode?: number;
};
export const sendSuccess = <T>({
	res,
	data,
	pagination,
	statusCode = 200,
}: SendSuccessParams<T>): void => {
	const response: SuccessResponse<T> = {
		success: true,
		data,
		...(pagination && { pagination }),
	};
	res.status(statusCode).json(response);
};

type SendErrorParams = {
	res: Response;
	message: string;
	statusCode: number;
	code?: string;
};
export const sendError = ({ res, message, statusCode, code }: SendErrorParams): void => {
	const response: ErrorResponse = {
		success: false,
		error: {
			message,
			...(code && { code }),
		},
	};
	res.status(statusCode).json(response);
};
