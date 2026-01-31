import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import logger from '../logger.js';

const errorMiddleware: ErrorRequestHandler = (
	err,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	logger.error(err.message, err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
};

export default errorMiddleware;
