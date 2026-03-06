import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
// Routers
import apiRouter from './api/apiRouter.js';
// Utils
import ENV from './config.js';
import { db } from './db/connection.js';
import logger from './shared/logger.js';
// Middlewares
import errorMiddleware from './shared/middlewares/errorMiddleware.js';
import loggerMiddleware from './shared/middlewares/loggerMiddleware.js';
import notFoundMiddleWare from './shared/middlewares/notFoundMiddleware.js';
import { startCoffeesIngestion } from './workers/coffeesIngestion.js';

const app = express();

// Cleaning
app.disable('x-powered-by');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', apiRouter);

// Not found middleware
app.use(notFoundMiddleWare);

// Error Middleware needs to be last
app.use(errorMiddleware);

// Start server
const server = app.listen(ENV.PORT, () => {
	logger.info(`Server running on port ${ENV.PORT}`);
});

// Start Coffees Ingestion
const { close } = await startCoffeesIngestion();

const shutdown = async (signal: string) => {
	logger.info(`${signal} signal received: closing HTTP server`);

	server.close(async () => {
		logger.info('HTTP server closed');

		logger.info('Closing workers');
		try {
			await close();
			logger.info('Workers closed');
		} catch (err) {
			logger.error(err, 'Error closing workers');
			process.exit(1);
		}

		logger.info('Closing database connection');
		try {
			await db.destroy();
			logger.info('Database connection closed');
		} catch (err) {
			logger.error(err, 'Error closing database connection');
			process.exit(1);
		}

		logger.info('Shutdown complete');
		process.exit(0);
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
