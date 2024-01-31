import jwt, { Secret } from 'jsonwebtoken';

export interface Payload {
    id: number;
    email: string;
}

const privateKey = process.env.JWT_SECRET as Secret;
const refreshKey = process.env.JWT_SECRET_REFRESH as Secret;

export function signJWT(payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            privateKey,
            {
                expiresIn: '1min',
                algorithm: 'HS256',
                issuer: JSON.stringify(payload.id),
            },
            (err, encoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encoded as string);
                }
            }
        );
    });
}

export function signJWT_Refresh(payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            refreshKey,
            {
                expiresIn: '24h',
                algorithm: 'HS256',
                issuer: JSON.stringify(payload.id),
            },
            (err, encoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encoded as string);
                }
            }
        );
    });
}

export function verifyJWT(token: string): Payload {
    try {
        const decoded = jwt.verify(token, privateKey) as Payload;

        return {
            email: decoded.email,
            id: decoded.id,
        };
    } catch (error: any) {
        throw new Error('Not authorozied!');
    }
}

export function verifyJWT_Refresh(token: string): Payload {
    try {
        const payload = jwt.verify(token, refreshKey) as Payload;

        return {
            email: payload.email,
            id: payload.id,
        };
    } catch (error: any) {
        throw error;
    }
}
