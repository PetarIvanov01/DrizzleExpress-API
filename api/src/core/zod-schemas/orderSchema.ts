import { z } from 'zod';

const orderProductInfo = z
    .object(
        {
            _productId: z
                .string({ required_error: 'ProductId is required!' })
                .uuid(),
            quantity: z.number({
                required_error: 'Quantity is required!',
            }),
            subtotal: z.number({
                required_error: 'SubTotal is required!',
            }),
        },
        {
            required_error:
                'Data is required: {_productId, quantity, subtotal}',
        }
    )
    .strict();
export const orderSchem = z
    .object({
        orderInfo: z
            .object({
                _userId: z
                    .string({ required_error: 'UserId is required!' })
                    .uuid(),
                orderAddress: z.object({
                    address: z
                        .string({
                            required_error: 'Address is required!',
                            invalid_type_error: 'Invalid order address',
                        })
                        .min(5, 'Address must be at least 5 characters long')
                        .max(
                            100,
                            'Address must be at most 100 characters long'
                        ),
                    country: z
                        .string({
                            required_error: 'Country is required!',
                            invalid_type_error: 'Invalid country',
                        })
                        .min(3, 'Country must be at least 3 characters long')
                        .max(50, 'Country must be at most 50 characters long'),
                    city: z
                        .string({
                            required_error: 'City is required!',
                            invalid_type_error: 'Invalid city',
                        })
                        .min(2, 'City must be at least 2 characters long')
                        .max(50, 'City must be at most 50 characters long'),
                    postcode: z
                        .number({
                            required_error: 'Postcode is required!',
                            invalid_type_error: 'Invalid postcode',
                        })
                        .refine(
                            (val) =>
                                String(val).length >= 4 &&
                                String(val).length <= 10,
                            {
                                message:
                                    'Postcode must be between 4 and 10 digits long',
                            }
                        ),
                }),
                totalPrice: z.number({
                    required_error: 'TotalPrice is required!',
                }),
            })
            .strict(),
        orderProducts: z.array(orderProductInfo),
    })
    .strict();

export type Order = z.infer<typeof orderSchem>;
