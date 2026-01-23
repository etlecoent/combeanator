import type { ErrorRequestHandler } from 'express';
import logger from '../logger.js';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
	logger.error(err.message, err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
};

export default errorMiddleware;
