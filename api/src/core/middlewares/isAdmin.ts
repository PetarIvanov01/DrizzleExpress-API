import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/Errors';
import { db } from '../../config/database';
export default async function isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.body.email) {
            throw new AuthorizationError(
                "Can't access this route. Invalid Email!"
            );
        }
        const user = await db.query.user.findFirst({
            where({ email }, { eq }) {
                return eq(email, req.body.email);
            },
            columns: {
                type: true,
            },
        });
        if (user?.type === 'admin') {
            return next();
        }
        throw new AuthorizationError('Not Authorized to perform this call!');
    } catch (error) {
        return next(error);
    }
}
