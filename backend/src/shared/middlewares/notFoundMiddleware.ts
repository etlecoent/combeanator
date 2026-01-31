import type { NextFunction, Request, RequestHandler, Response } from 'express';

const notFoundMiddleWare: RequestHandler = (_req: Request, res: Response, _next: NextFunction) => {
	res.status(404).json({
		message: "Sorry can't find that!",
	});
};

export default notFoundMiddleWare;
