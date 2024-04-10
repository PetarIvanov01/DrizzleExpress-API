import { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import requestLogger from '../../../loggers/requestLogger';

export default function rateLimmiter() {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        statusCode: 429,
        handler: function (req: Request, res: Response) {
            requestLogger.warning('Rate limit exceeded');
            res.status(429).json({ error: 'Rate limit exceeded' });
        },
    });
}
