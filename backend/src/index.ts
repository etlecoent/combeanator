import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import logger from './logger.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

// Cleaning
app.disable('x-powered-by');

// Middlewares
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res, _next) => {
	res.status(200).json({
		message: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

app.use((_req, res, _next) => {
	res.status(404).json({
		message: "Sorry can't find that!",
	});
});

// custom error handler
app.use(errorMiddleware);

// Start server
app.listen(process.env.PORT, () => {
	logger.info(`Server running on port ${process.env.PORT}`);
});
