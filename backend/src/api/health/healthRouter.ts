import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { sendSuccess } from '../../shared/utils/response.js';

const healthRouter: Router = Router();

healthRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
	sendSuccess(res, {
		message: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

export default healthRouter;
