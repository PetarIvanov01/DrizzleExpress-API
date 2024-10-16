import { db } from '../../../config/database';
import { count, eq } from 'drizzle-orm';
import { review } from '../../../database/schemas/schema_products';

import { ReviewType } from '../../zod-schemas/productSchemas';

import { AuthorizationError } from '../../utils/Errors';
import { calculatedRating } from '../../helpers/calculateRating';

export const getReviewsByUserId = async (userId: string) => {
    const result = await db.query.review.findMany({
        where({ user_id }, { eq }) {
            return eq(user_id, userId);
        },
        limit: 5,
    });

    return result ? result : {};
};

export const getReviewsByProductId = async (productId: string) => {
    const result = await db.query.review.findMany({
        columns: {
            product_id: false,
            user_id: false,
        },
        where({ product_id }, { eq }) {
            return eq(product_id, productId);
        },
        limit: 5,
    });
    const reviewCount = await db
        .select({
            count: count(review.review_id),
        })
        .from(review)
        .where(eq(review.product_id, productId))
        .then((value) => value[0].count);

    const productTotalRating = calculatedRating(result.map((e) => e.rating));

    return { reviewCount, result, productTotalRating };
};

type Rating = 1 | 2 | 3 | 4 | 5;
export const createReviewByProductId = async (
    userId: string,
    productId: string,
    reviewBody: ReviewType
) => {
    const hasReview = await db.query.review.findFirst({
        where({ user_id }, { eq }) {
            return eq(user_id, userId);
        },
    });

    if (hasReview) {
        throw new AuthorizationError('You have already reviewed this product.');
    }

    await db.insert(review).values({
        user_id: userId,
        product_id: productId,
        rating: reviewBody.rating as Rating,
        review_text: reviewBody.reviewMessage,
    });
};

export const getReviewById = async (reviewId: string) => {
    const result = await db.query.review.findFirst({
        columns: {
            product_id: false,
            user_id: false,
        },
        where({ review_id }, { eq }) {
            return eq(review_id, reviewId);
        },
    });
    if (!result) {
        throw new Error('Review is not found!');
    }
    return result;
};
export const deleteReviewById = async (userId: string, reviewId: string) => {
    const result = await db.query.review.findFirst({
        columns: {
            user_id: true,
        },
        where({ review_id }, { eq }) {
            return eq(review_id, reviewId);
        },
    });
    if (!result) {
        throw new Error('Review is not found!');
    }
    if (result.user_id !== userId) {
        throw new AuthorizationError('Not Authorized');
    }

    await db.delete(review).where(eq(review.review_id, reviewId));
};
