import { Router } from 'express';
import { getCartDataController } from '../controllers/cart/cartController';

const cartRoute = Router();
cartRoute.post('/', getCartDataController);

export default cartRoute;
