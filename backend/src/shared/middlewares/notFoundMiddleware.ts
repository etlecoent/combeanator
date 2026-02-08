import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { sendError } from '../utils/response.js';

const notFoundMiddleWare: RequestHandler = (_req: Request, res: Response, _next: NextFunction) => {
	sendError(res, "Sorry can't find that!", 404, 'NOT_FOUND');
};

export default notFoundMiddleWare;
