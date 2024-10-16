import { Router } from 'express';
import { reviewSchema } from '../zod-schemas/productSchemas';

import {
    getReviewsController,
    createReviewController,
    deleteReviewController,
    getReviewController,
} from '../controllers/products/reviewController';

import { getProductByIdController } from '../controllers/products/productController';

import validateBody from '../middlewares/zodBodyValidator';
import { isValueParamsUUID } from '../middlewares/validateUUID';
import { authJWT } from '../middlewares/authJWT';

const productRoute = Router();

const PARAM_PRODUCT_ID = 'productId';
const PARAM_REVIEW_ID = 'reviewId';

productRoute.get(
    '/:productId',
    isValueParamsUUID(PARAM_PRODUCT_ID),
    getProductByIdController
);

productRoute
    .route('/:productId/review')
    .all(isValueParamsUUID(PARAM_PRODUCT_ID))
    .get(getReviewsController)
    .post(authJWT(), validateBody(reviewSchema), createReviewController);

productRoute
    .route('/:productId/review/:reviewId')
    .all(isValueParamsUUID(PARAM_REVIEW_ID))
    .get(getReviewController)
    .delete(authJWT(), deleteReviewController);

export default productRoute;
