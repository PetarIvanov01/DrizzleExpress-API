import { db } from '../../../config/database';

import {
    order_info,
    order_status,
    order_product_info,
    user_order_address,
    user_order_personal_info,
} from '../../../database/schemas/schema_orders';

import { getUserById } from './getUser';
import { Order } from '../../schemas/orderSchema';
import { DrizzleError, and, eq } from 'drizzle-orm';
import takeUniqueOrThrow from '../../utils/takeUniqueOrThrow';

export async function createOrder(
    userId: string,
    order: Order
): Promise<void> | never {
    try {
        const existingUser = await getUserById(userId);
        if (!existingUser) throw new Error('User with that ID did not exist');

        await db.transaction(async (tx) => {
            try {
                const order_id = await tx
                    .insert(order_info)
                    .values({
                        user_id: userId,
                        total_price: order.orderInfo.totalPrice.toString(),
                    })
                    .returning({ orderId: order_info.order_id })
                    .then((e) => e[0].orderId);

                await tx.insert(user_order_personal_info).values({
                    order_id,
                    full_name: `${existingUser.first_name} ${existingUser.last_name}`,
                    phone_number: existingUser.phone_number,
                });

                await tx.insert(user_order_address).values({
                    order_id,
                    ...order.orderInfo.orderAddress,
                });

                for (const orderProduct of order.orderProducts) {
                    await tx.insert(order_product_info).values({
                        order_id,
                        product_id: orderProduct._productId,
                        quantity: orderProduct.quantity,
                        subtotal: orderProduct.subtotal.toString(),
                    });
                }
            } catch (error) {
                try {
                    tx.rollback();
                } catch (error) {
                    throw new DrizzleError({
                        message:
                            'Operation is rollback. Please check your request!',
                    });
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function getOrders(userId: string, orderId: string | undefined) {
    try {
        const existingUser = await getUserById(userId);
        if (!existingUser) throw new Error('User with that ID did not exist');

        if (orderId) {
            const orderInfo = await db
                .select({
                    orderId: order_info.order_id,
                    totalPrice: order_info.total_price,
                    status_name: order_status.status_name,
                    createdAt: order_info.order_date,
                    userProfile: {
                        userId: order_info.user_id,
                        fullName: user_order_personal_info.full_name,
                        phoneNumber: user_order_personal_info.phone_number,
                    },
                    userAddress: {
                        country: user_order_address.country,
                        city: user_order_address.city,
                        address: user_order_address.address,
                        postcode: user_order_address.postcode,
                    },
                })
                .from(order_info)
                .where(
                    and(
                        eq(order_info.order_id, orderId),
                        eq(order_info.user_id, userId)
                    )
                )
                .innerJoin(
                    order_status,
                    eq(order_status.status_id, order_info.status_id)
                )
                .innerJoin(
                    user_order_address,
                    eq(user_order_address.order_id, order_info.order_id)
                )
                .innerJoin(
                    user_order_personal_info,
                    eq(user_order_personal_info.order_id, order_info.order_id)
                )
                .then(takeUniqueOrThrow);

            const orderedProducts = await db
                .select({
                    productId: order_product_info.product_id,
                    quantity: order_product_info.quantity,
                    subtotal: order_product_info.subtotal,
                })
                .from(order_product_info)
                .where(eq(order_product_info.order_id, orderId));

            return { orderInfo, orderedProducts };
        }

        return db.query.order_info.findMany({
            where({ user_id }, { eq }) {
                return eq(user_id, userId);
            },
        });
    } catch (error) {
        throw error;
    }
}
