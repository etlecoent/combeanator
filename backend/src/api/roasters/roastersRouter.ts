import type { Request, Response } from 'express';
import { Router } from 'express';
import { db } from '../../db/connection.js';
import { sendSuccess } from '../../shared/utils/response.js';

const roastersRouter: Router = Router();

roastersRouter.get('/', async (_req: Request, res: Response) => {
	const roasters = await db.selectFrom('roasters').selectAll().execute();

	sendSuccess({ res, data: roasters });
});

export default roastersRouter;
