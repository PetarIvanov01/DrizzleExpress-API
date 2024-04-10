import { Request } from 'express';
import { expressjwt } from 'express-jwt';
import requestLogger from '../../../loggers/requestLogger';

export function authJWT() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        requestLogger.warning('JWT secret not provided!');
        throw new Error('Secret not provided!');
    }

    return expressjwt({
        getToken: TokenGetter,
        secret: secret,
        algorithms: ['HS256'],
    });
}

function TokenGetter(req: Request): string | Promise<string> | undefined {
    if (req.headers.authorization) {
        return req.headers.authorization;
    }
    return;
}
