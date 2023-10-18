import { Express } from "express"
import { userAuthRoute } from "../core/routes/userAuth"
import errorHandler from "../core/middlewares/errorHandler";

export default function routerConfig(app: Express) {

    app.use('/api/user', userAuthRoute);
    app.use(errorHandler);
}