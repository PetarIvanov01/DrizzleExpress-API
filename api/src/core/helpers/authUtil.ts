import jwt, { JwtPayload, Secret } from "jsonwebtoken"

const secret = process.env.JWT_SECRET as Secret
interface payload {
    id: string,
    username: string
}

export const createSession = (data: payload) => {
    const payload: JwtPayload = {
        id: data.id,
        username: data.username
    };

    return jwt.sign(payload, secret, configJWT);
}

export const verifyToken = (token: string) => {

    return jwt.verify(token, secret);
}

const configJWT = {
    expiresIn: '2d'
}