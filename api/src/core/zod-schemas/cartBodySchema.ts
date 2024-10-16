import { z } from 'zod';

export const cartSchema = z
    .object({
        cartItems: z.record(z.string().uuid(), z.number().int()),
        length: z.number().int().default(0),
    })
    .strict();

export type CartBody = z.infer<typeof cartSchema>;
