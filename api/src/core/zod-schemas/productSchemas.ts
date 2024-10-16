import { z } from 'zod';

export const reviewSchema = z
    .object({
        rating: z
            .number({ required_error: 'Rating is required' })
            .min(1, { message: 'Rating must be at least 1' })
            .max(5, { message: 'Rating must be at most 5' }),
        reviewMessage: z
            .string()
            .max(250, 'Review message must be at most 170 characters long')
            .optional(),
    })
    .strict();

export type ReviewType = z.infer<typeof reviewSchema>;
