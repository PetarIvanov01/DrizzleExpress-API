import { ReviewType } from '../../zod-schemas/productSchemas';

import { Request, Response } from 'express';
import { Request as RequestJWT } from 'express-jwt';

import wrapController from '../../helpers/wrapperTryCatch';
import { AuthorizationError } from '../../utils/Errors';

import {
    createReviewByProductId,
    deleteReviewById,
    getReviewById,
    getReviewsByProductId,
} from '../../services/productService/review';

export const getReviewsController = wrapController(
    async (req: Request, res: Response) => {
        const productId = req.params.productId;

        const result = await getReviewsByProductId(productId);

        res.status(200).json({ ...result });
    }
);

export const createReviewController = wrapController(
    async (req: RequestJWT, res: Response) => {
        const userId = req.auth?.iss;
        const productId = req.params.productId;
        const reviewBody = req.body as ReviewType;

        if (!userId) {
            throw new AuthorizationError('Not Authorized');
        }

        await createReviewByProductId(userId, productId, reviewBody);

        res.status(201).json({ message: 'Review is successfuly created' });
    }
);

export const getReviewController = wrapController(
    async (req: Request, res: Response) => {
        const reviewId = req.params.reviewId;

        const result = await getReviewById(reviewId);

        res.status(200).json({ result });
    }
);

export const deleteReviewController = wrapController(
    async (req: RequestJWT, res: Response) => {
        const userId = req.auth?.iss;
        const reviewId = req.params.reviewId;

        if (!userId) {
            throw new AuthorizationError('Not Authorized');
        }

        await deleteReviewById(userId, reviewId);

        res.status(200).json({
            message: `Review ${reviewId} is successfuly removed`,
        });
    }
);
