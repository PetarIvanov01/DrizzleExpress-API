import { Express, urlencoded, static as _static, json } from 'express';

import cookieParser from 'cookie-parser';

import bodyTrimmer from '../core/middlewares/trimBody';
import loggerMiddleware from '../core/middlewares/loggerMiddleware';
import rateLimmiter from '../core/middlewares/rateLimiter';

import cors from 'cors';
import { setCorsOptions } from './util';

import serverLogger from '../../loggers/index';

export default function expressConfig(app: Express) {
    app.use(cors(setCorsOptions(app)));

    app.use(rateLimmiter());

    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use(bodyTrimmer);
    app.use(_static('public'));

    app.use(cookieParser());

    app.use(loggerMiddleware());

    serverLogger.info('Express app configured successfully.');
}
