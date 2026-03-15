import { Router } from 'express';
import authenticationMiddleware from '../shared/middlewares/authenticationMiddleware.js';
import authRouter from './auth/authRouter.js';
import coffeesRouter from './coffees/coffeesRouter.js';
import healthRouter from './health/healthRouter.js';
import roastersRouter from './roasters/roastersRouter.js';
import usersRouter from './users/usersRouter.js';

const apiRouter: Router = Router();

// Public routes
apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);

// Protected routes
apiRouter.use(authenticationMiddleware);
apiRouter.use('/users', usersRouter);
apiRouter.use('/coffees', coffeesRouter);
apiRouter.use('/roasters', roastersRouter);

export default apiRouter;
