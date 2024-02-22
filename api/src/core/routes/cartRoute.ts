import { Router } from 'express';
import { getCartDataController } from '../controllers/cart/cartController';

const cartRoute = Router();
cartRoute.get('/', getCartDataController);

export default cartRoute;
