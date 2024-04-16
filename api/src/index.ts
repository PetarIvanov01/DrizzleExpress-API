import express, { Request, Response } from 'express';
import 'dotenv/config';
import './config/database';

import serverLogger from '../loggers/index';

import expressConfig from './config/express';
import routerConfig from './config/router';
import notFoundController from './core/controllers/errors/notFoundController';

main();
async function main() {
    const app = express();

    try {
        expressConfig(app);
        routerConfig(app);

        app.get('/health', (req: Request, res: Response) => {
            res.status(2000).send('Welcome!');
        });
        app.get('*', notFoundController);

        app.listen(process.env.PORT, () => {
            serverLogger.info(`Server is running at ${process.env.PORT}`);
        });

        const PORT = parseInt(process.env.PORT || '5000');

        app.listen(PORT, '0.0.0.0', () => {
            serverLogger.info(`Server is running at http://0.0.0.0:${PORT}`);
        });
    } catch (error) {
        serverLogger.error(
            `Error occurred during server initialization: ${error}`
        );
        process.exit(1);
    }
}
