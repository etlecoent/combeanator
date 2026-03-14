import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { sendError } from '../utils/response.js';

const notFoundMiddleWare: RequestHandler = (_req: Request, res: Response, _next: NextFunction) => {
	sendError({ res, message: "Sorry can't find that!", statusCode: 404, code: 'NOT_FOUND' });
};

export default notFoundMiddleWare;
