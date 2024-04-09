import express from 'express';
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

        app.get('*', notFoundController);

        app.listen(process.env.PORT, () => {
            serverLogger.info(`Server is running at ${process.env.PORT}`);
        });
    } catch (error) {
        serverLogger.error(
            `Error occurred during server initialization: ${error}`
        );
        process.exit(1);
    }
}
