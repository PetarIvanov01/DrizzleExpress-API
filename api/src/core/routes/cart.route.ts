import { Router } from "express"
import { getCartDataController } from "../controllers/cart";

const cartRoute = Router();
cartRoute.post('/', getCartDataController);

export default cartRoute;