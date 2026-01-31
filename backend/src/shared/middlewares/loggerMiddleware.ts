import { pinoHttp } from 'pino-http';
import logger from '../logger.js';

const loggerMiddleware = pinoHttp({ logger });

export default loggerMiddleware;
