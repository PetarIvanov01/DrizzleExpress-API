import { Router } from 'express';
import { reviewSchema } from '../zod-schemas/productSchemas';

import {
    getReviewsController,
    createReviewController,
    deleteReviewController,
} from '../controllers/products/reviewController';

import { getProductByIdController } from '../controllers/products/productController';

import validateBody from '../middlewares/zodBodyValidator';
import { isProductIdUUID } from '../middlewares/validateUUID';
import { authJWT } from '../middlewares/authJWT';

const productRoute = Router();

productRoute.get('/:productId', isProductIdUUID, getProductByIdController);

productRoute
    .route('/:productId/review')
    .all(isProductIdUUID)
    .get(getReviewsController)
    .post(authJWT(), validateBody(reviewSchema), createReviewController)
    .delete(authJWT(), deleteReviewController);

export default productRoute;
