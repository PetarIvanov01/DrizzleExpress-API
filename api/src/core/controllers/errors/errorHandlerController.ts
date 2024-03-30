import { NextFunction, Request, Response } from 'express';
import { AuthorizationError, ValidationError } from '../../utils/Errors';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from 'express-jwt';
import { DrizzleError } from 'drizzle-orm';

interface ErrorPayload {
    type: string;
    message: string;
    stack?: any;
    errors?: any;
}
const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let status = 500;

    let errorPayload: ErrorPayload = {
        type: error.name,
        message: error.message ?? 'Unexpected error occur!',
        stack: error.stack || null,
    };
    if (error instanceof TokenExpiredError) {
        errorPayload.message = 'Token is expired!';
        status = 400;
    } else if (error instanceof JsonWebTokenError) {
        errorPayload.message = error.message ?? 'Ivalid Token!';
        status = 400;
    } else if (error instanceof UnauthorizedError) {
        errorPayload.message = error.message;
        status = 400;
    } else if (error instanceof ValidationError) {
        errorPayload.message = error.message ?? 'Validation failed!';
        errorPayload.errors = error.errors;
        status = 422;
    } else if (error instanceof AuthorizationError) {
        errorPayload.message = error.message ?? 'Not Authorized!';
        status = 401;
    } else if (error instanceof DrizzleError) {
        errorPayload.message = error.message ?? 'Internel Error';
        status = 422;
    }

    return res.status(status).send(errorPayload);
};

export default errorHandler;
