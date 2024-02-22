import { Request } from 'express';
import { expressjwt } from 'express-jwt';

export function authJWT() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Secret not provided!');
    }

    return expressjwt({
        getToken: TokenGetter,
        secret: secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            { url: /\/api\/v1\/user(?:\/.*)?/, methods: ['POST'] },
            { url: /\/api\/v1\/catalog(?:\/.*)?/, methods: ['GET'] },
            { url: '/api/v1/cart', methods: ['GET'] },
            { url: '/api/v1/refreshtoken', method: 'POST' },
        ],
    });
}
// TODO :: Check for admin rights
function TokenGetter(req: Request): string | Promise<string> | undefined {
    if (req.headers.authorization) {
        return req.headers.authorization;
    }
    return;
}
