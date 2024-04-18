import { Request, Response } from 'express';
import path from 'path';
import serverLogger from '../../../../loggers';

const notFoundController = (req: Request, res: Response) => {
    serverLogger.info(`Route not found: ${req.method} ${req.url}`);
    res.sendFile(path.resolve('public/index.html'));
};

export default notFoundController;
