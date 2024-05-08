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
            .object(
                {
                    _userId: z
                        .string({ required_error: 'UserId is required!' })
                        .uuid(),
                    orderAddress: z.object({
                        address: z.string({
                            required_error: 'Address is required!',
                        }),
                        country: z.string({
                            required_error: 'Country is required!',
                        }),
                        city: z.string({ required_error: 'City is required!' }),
                        postcode: z.number({
                            required_error: 'Postcode is required!',
                        }),
                    }),
                    totalPrice: z.number({
                        required_error: 'TotalPrice is required!',
                    }),
                },
                {
                    required_error: 'Data is required: {_userId, totalPrice}',
                }
            )
            .strict(),
        orderProducts: z.array(orderProductInfo),
    })
    .strict();

export type Order = z.infer<typeof orderSchem>;
