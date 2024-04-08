import jwt, { Secret } from 'jsonwebtoken';

export interface Payload {
    id: string;
    email: string;
    fullName: string;
    type: 'admin' | 'user';
}

const privateKey = process.env.JWT_SECRET as Secret;
const refreshKey = process.env.JWT_SECRET_REFRESH as Secret;

export function signJWT(payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            privateKey,
            {
                expiresIn: '15min',
                algorithm: 'HS256',
                issuer: payload.id,
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
                issuer: payload.id,
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

function withVerifyJWT(verifyKey: Secret) {
    return (token: string): Payload => {
        const decoded = jwt.verify(token, verifyKey) as Payload;

        return {
            email: decoded.email,
            id: decoded.id,
            fullName: decoded.fullName,
            type: decoded.type,
        };
    };
}

export const verifyJWT = withVerifyJWT(privateKey);
export const verifyJWT_Refresh = withVerifyJWT(refreshKey);
