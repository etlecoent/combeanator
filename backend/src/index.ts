import express from 'express';
import helmet from 'helmet';
// routers
import coffeesRouter from './api/coffees/coffeesRouter.js';
import healthRouter from './api/health/healthRouter.js';
import usersRouter from './api/users/usersRouter.js';
// utils
import ENV from './config.js';
import { db } from './db/connection.js';
import logger from './shared/logger.js';
// middlewares
import errorMiddleware from './shared/middlewares/errorMiddleware.js';
import loggerMiddleware from './shared/middlewares/loggerMiddleware.js';
import notFoundMiddleWare from './shared/middlewares/notFoundMiddleware.js';

const app = express();

// Cleaning
app.disable('x-powered-by');

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/health', healthRouter);
app.use('/users', usersRouter);
app.use('/coffees', coffeesRouter);

// Not found middleware
app.use(notFoundMiddleWare);

// Error Middleware needs to be last
app.use(errorMiddleware);

// Start server
const server = app.listen(ENV.PORT, () => {
	logger.info(`Server running on port ${ENV.PORT}`);
});

const shutdown = async (signal: string) => {
	logger.info(`${signal} signal received: closing HTTP server`);

	server.close(async () => {
		logger.info('HTTP server closed');

		try {
			await db.destroy();
			logger.info('Database connection closed');
			process.exit(0);
		} catch (err) {
			logger.error(err, 'Error closing database connection');
			process.exit(1);
		}
	});

	// Force shutdown after 60 seconds
	setTimeout(() => {
		logger.error('Forced shutdown after timeout');
		process.exit(1);
	}, 60000);
};

// Graceful shutdowns
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
