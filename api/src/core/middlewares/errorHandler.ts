import { NextFunction, Request, Response } from "express"
interface ErrorPayload {
    type: string,
    message: string,
    stack?: any,
    errors?: any
}
const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let status = 500;

    let errorPayload: ErrorPayload = {
        type: error.name,
        message: error.message ?? 'Unexpected error occur!',
        stack: error.stack || null
    }
    if (error.name === 'TokenExpiredError') {
        errorPayload.message = 'Token is expired!'
        status = 400;
    }
    else if (error.name === 'JsonWebTokenError') {
        errorPayload.message = 'Ivalid Token!'
        status = 400;
    }
    else if (error.name === 'ValidationError') {
        errorPayload.message = 'Validation failed!';
        errorPayload.errors = error.errors
        status = 422;
    }

    return res.status(status).send(errorPayload);
}

export default errorHandler