import { NextFunction, Response, Request } from 'express';
import { z } from 'zod';

export default function validateBody<SchemaType>(
    schema: z.ZodType<SchemaType>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = schema.safeParse(req.body, {});

        if (!response.success) {
            const formatErr = response.error.flatten((issues) => {
                return {
                    path: issues.path,
                    message: issues.message,
                };
            });

            return res.status(400).json({ fields: formatErr.fieldErrors });
        }
        return next();
    };
}
