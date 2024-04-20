import express from 'express';
import 'dotenv/config';
import './config/database';

import serverLogger from '../loggers/index';

import expressConfig from './config/express';
import routerConfig from './config/router';
import notFoundController from './core/controllers/errors/notFoundController';
import checkHealthController from './core/controllers/health';

main();
async function main() {
    const PORT = parseInt(process.env.PORT || '5000');
    const app = express();

    try {
        app.get('/health', checkHealthController);

        expressConfig(app);
        routerConfig(app);

        app.get('*', notFoundController);

        app.listen(PORT, () => {
            serverLogger.info(`Server is running at PORT: ${PORT}`);
        });
    } catch (error) {
        serverLogger.error(
            `Error occurred during server initialization: ${error}`
        );
        process.exit(1);
    }
}
