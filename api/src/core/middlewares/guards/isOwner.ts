import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';
import { AuthorizationError } from '../../utils/Errors';

export default function isOwner(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authUserId = req.auth?.iss;
    const userId = req.params.userId;

    if (authUserId !== userId) throw new AuthorizationError('Not Authorized!');

    next();
}
