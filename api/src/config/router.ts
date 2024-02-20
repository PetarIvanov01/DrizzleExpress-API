import { Express } from 'express';

import authRoute from '../core/routes/authRoute';
import catalogRoute from '../core/routes/productsRoute';
import errorHandler from '../core/controllers/errors/errorHandlerController';
import cartRoute from '../core/routes/cartRoute';

const START_POINT_VERSION = '/api/v1';

export default function routerConfig(app: Express) {
    app.use(`${START_POINT_VERSION}/user`, authRoute);
    app.use(`${START_POINT_VERSION}/catalog`, catalogRoute);
    app.use(`${START_POINT_VERSION}/cart`, cartRoute);
    app.use(errorHandler);
}
