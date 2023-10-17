import { Express } from "express"
import { userAuthRoute } from "../core/routes/userAuth"

export default function routerConfig(app: Express) {

    app.use('/api/user', userAuthRoute);
}