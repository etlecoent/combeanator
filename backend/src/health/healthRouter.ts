import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
	res.status(200).json({
		message: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

export default healthRouter;
