import 'dotenv/config';
import './config/database';
import express from 'express';
import expressConfig from './config/express';
import routerConfig from './config/router';
import notFoundController from './core/controllers/notFoundController';

main();
async function main() {
    const app = express();

    try {
        expressConfig(app);
        routerConfig(app);

        app.get('*', notFoundController);

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
