import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as Secret;
const refresh_secret = process.env.JWT_SECRET_REFRESH as Secret;

interface payload {
    id: string,
    username: string
};

export const generateAccessToken = (data: payload) => {
    const payload: JwtPayload = {
        id: data.id,
        username: data.username
    };

    return jwt.sign(payload, secret, {
        expiresIn: "15min"
    });
}

export const verifyToken = (token: string) => {

    return jwt.verify(token, secret);
}


let refreshTokens:any = [];

export const generateRefreshToken = (data: payload) => {
    const payload: JwtPayload = {
        id: data.id,
        username: data.username
    };
    
    const refreshToken = jwt.sign(payload, refresh_secret, { expiresIn: "30min" })
    refreshTokens.push(refreshToken);
    console.log(refreshTokens);
    
    return refreshToken;
}