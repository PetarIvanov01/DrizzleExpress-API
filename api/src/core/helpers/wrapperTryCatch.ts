import { NextFunction, Request, RequestHandler, Response } from "express";

const wrapController = (controller: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export default wrapController