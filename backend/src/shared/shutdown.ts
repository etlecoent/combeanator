import logger from './logger.js';

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
export default shutdown;
