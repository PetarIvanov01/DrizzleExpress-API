import jwt, { Secret } from "jsonwebtoken";

export interface Payload {
    id: string,
    email: string
};

const privateKey = process.env.JWT_SECRET_REFRESH as Secret;

export function signJWT(payload: Payload, expiresIn: string | number) {

    return jwt.sign(payload, privateKey, { expiresIn });
};

export function verifyJWT(token: string): Payload {
    try {
        const decoded = jwt.verify(token, privateKey) as Payload;
        
        return {
            email: decoded.email,
            id: decoded.id
        };

    } catch (error: any) {
        throw new Error('Not authorozied!')
    }
};