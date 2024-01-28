import { Express } from "express";

import userAuthRoute from "../core/routes/userAuth";
import catalogRoute from "../core/routes/catalog.route";
import errorHandler from "../core/controllers/errorHandler";
import cartRoute from "../core/routes/cart.route";

const START_POINT_VERSION = "/api/v1";

export default function routerConfig(app: Express) {
  app.use(`${START_POINT_VERSION}/user`, userAuthRoute);
  app.use(`${START_POINT_VERSION}/catalog`, catalogRoute);
  app.use(`${START_POINT_VERSION}/cart`, cartRoute);
  app.use(errorHandler);
}
