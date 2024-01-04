import { Response, NextFunction } from "express"
import { RequestUserProp } from "../../typescript/interfaces/user.interface";
import { verifyJWT } from "../helpers/jwt.utils";

export default function authChecker(req: RequestUserProp, res: Response, next: NextFunction) {

    try {

        const accessToken = req.headers.authorization?.split('Bearer')[1].trim();

        if (!accessToken) throw new Error('No access token provided!');

        const payload = verifyJWT(accessToken);

        req.user = {
            id: payload.id,
            email: payload.email
        }

        return next();

    } catch (error) {
        next(error)
    }
};