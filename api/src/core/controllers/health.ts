import { Request, Response } from 'express';
export default function checkHealthController(req: Request, res: Response) {
    res.status(200).json({
        message: 'Api is OK!',
    });
}
