import { Express } from "express"
import { userAuthRoute } from "../core/routes/userAuth"

import errorHandler from "../core/middlewares/errorHandler";
import { userTestRouter } from "../core/routes/test";

const START_POINT_VERSION = '/api/v1'

export default function routerConfig(app: Express) {

    app.use(`${START_POINT_VERSION}/user`, userAuthRoute);
    app.use(`${START_POINT_VERSION}/catalog`, userTestRouter);
    app.use(errorHandler);
}