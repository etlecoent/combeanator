import { Router } from 'express';

import coffeesRouter from './coffees/coffeesRouter.js';
import healthRouter from './health/healthRouter.js';
import usersRouter from './users/usersRouter.js';

const apiRouter: Router = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/coffees', coffeesRouter);

export default apiRouter;
