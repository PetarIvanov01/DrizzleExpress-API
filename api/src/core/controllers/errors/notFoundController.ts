import { Request, Response } from 'express';
import path from 'path';
import serverLogger from '../../../../loggers';

const allowedExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.ico'];

const notFoundController = (req: Request, res: Response) => {
    if (
        allowedExtensions.filter((ext) => req.url.indexOf(ext) > 0).length > 0
    ) {
        if (req.url.includes('image')) {
            res.sendFile(path.resolve(`public/uploads/${req.url}`));
        }
        res.sendFile(path.resolve(`public/${req.url}`));
    } else {
        serverLogger.info(`Route not found: ${req.method} ${req.url}`);
        res.sendFile(path.resolve('public/index.html'));
    }
};

export default notFoundController;
