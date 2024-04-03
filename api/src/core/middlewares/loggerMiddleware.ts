import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import requestLogger from '../../../loggers/requestLogger';

declare module 'express-serve-static-core' {
    interface Request {
        requestId: string;
    }
}

export default function logRequestInfo() {
    return (req: Request, res: Response, next: NextFunction) => {
        const { method, headers, originalUrl, protocol, query, url } = req;

        const requestId = randomUUID();

        const startTime = Date.now();
        req.requestId = requestId;

        const logObj = {
            _RequestId: requestId,
            Request: {
                Method: method,
                URL: `${protocol}://${req.get('host')}${originalUrl}`,
                Headers: {
                    accept: headers['accept'],
                    'content-type': headers['content-type'],
                    connection: headers.connection,
                    host: headers.host,
                    'user-agent': headers['user-agent'],
                },
                Query: query,
            },
        };

        const logMessage = `Incoming ${method} request to ${url}`;
        requestLogger.debug(logMessage, logObj);

        res.on('finish', () => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            if (res.statusCode > 400) {
            }
            const responseLogObj = {
                _RequestId: requestId,
                Response: {
                    Status: res.statusCode,
                    Headers: {
                        authorization: res.getHeader('authorization')
                            ? true
                            : false,
                        'content-type': res.getHeader('content-type'),
                        'set-cookie': res
                            .getHeader('set-cookie')
                            ?.toString()
                            .split('=')[0],
                    },
                },
                ResponseTime: responseTime + 'ms',
            };

            const responseLogMessage = `Outgoing ${method} response with status ${res.statusCode} in ${responseTime}ms`;
            if (res.statusCode < 400) {
                requestLogger.debug(responseLogMessage, responseLogObj);
            }
        });

        next();
    };
}
