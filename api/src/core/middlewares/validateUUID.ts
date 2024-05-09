import { Request, Response, NextFunction } from 'express';
import validateUUID from '../validations/zodValidateUUID';

export function isValueParamsUUID(valueId: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            validateUUID(req.params[valueId]);
            next();
        } catch (error) {
            next(error);
        }
    };
}
