import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../helpers/authUtil";

export default function authChecker(req: Request, res: Response, next: NextFunction) {

    try {

        const header = req.headers.authorization;
        const tokenString = header?.split(' ')[1];

        let isToken;
        if (typeof tokenString === 'string') {
            isToken = verifyToken(tokenString);
        }
        console.log(isToken);

        next();

    } catch (error) {
        res.send({ error })
    }
}