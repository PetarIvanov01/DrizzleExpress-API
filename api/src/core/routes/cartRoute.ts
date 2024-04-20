import { Router } from 'express';

import validateBody from '../middlewares/zodBodyValidator';
import { cartSchema } from '../schemas/cartBodySchema';

import { getCartController } from '../controllers/cart/cartController';

const cartRoute = Router();
cartRoute.post('/', validateBody(cartSchema), getCartController);

export default cartRoute;
