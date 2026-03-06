import { pinoHttp } from 'pino-http';
import logger from '../logger.js';

const loggerMiddleware = pinoHttp({ logger: logger.child({ name: 'http' }) });

export default loggerMiddleware;
