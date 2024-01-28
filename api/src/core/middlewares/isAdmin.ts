import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/Errors';
export default function isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const IS_ADMIN = process.env.ADMIN_ID;

        if (IS_ADMIN) {
            return next();
        }
        throw new ValidationError('Not Authorized', null);
    } catch (error) {
        throw error;
    }
}
