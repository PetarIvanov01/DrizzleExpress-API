import { Express } from 'express';

import authRoute from '../core/routes/authRoute';
import userRoute from '../core/routes/userRoute';
import catalogRoute from '../core/routes/catalogRoute';
import errorHandler from '../core/controllers/errors/errorHandlerController';
import cartRoute from '../core/routes/cartRoute';
import productRoute from '../core/routes/productRoute';

const START_POINT_VERSION = '/api/v1';

export default function routerConfig(app: Express) {
    app.use(`${START_POINT_VERSION}/users`, authRoute, userRoute);
    app.use(`${START_POINT_VERSION}/catalog`, catalogRoute);
    app.use(`${START_POINT_VERSION}/product`, productRoute);
    app.use(`${START_POINT_VERSION}/cart`, cartRoute);

    app.use(errorHandler);
}
