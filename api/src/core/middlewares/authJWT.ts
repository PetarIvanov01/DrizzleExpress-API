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
            {
                url: /\/api\/v1\/user(?:\/.*)?/,
                methods: ['POST'],
            },
            { url: '/api/v1/catalog', methods: ['GET'] },
            { url: '/api/v1/cart', methods: ['POST'] },
        ],
    });
}
// TODO :: Check for admin rights
function TokenGetter(req: Request): string | Promise<string> | undefined {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return;
}
