import { NextFunction, Request, Response } from 'express';

export default function bodyTrimmer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.method === 'POST' || req.method === 'PUT') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string') req.body[key] = value.trim();
        }
    }
    next();
}
