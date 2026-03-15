import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ENV from '../../config.js';
import { UnauthorizedError } from '../errors/AppError.js';

const auhenticationMiddleWare = (req: Request, _res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	jwt.verify(authorization || '', ENV.JWT_SECRET, (err, _decoded) => {
		if (err?.name === 'TokenExpiredError') next(new UnauthorizedError('Expired Token'));
		else if (err) next(new UnauthorizedError('Invalid token'));
		else next();
	});
};

export default auhenticationMiddleWare;
