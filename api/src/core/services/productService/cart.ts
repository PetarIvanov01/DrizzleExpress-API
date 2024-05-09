import takeUniqueOrThrow from '../../utils/takeUniqueOrThrow';

import { db } from '../../../config/database';
import {
    categories,
    products,
} from '../../../database/schemas/schema_products';
import { eq } from 'drizzle-orm';
import { CartBody } from '../../zod-schemas/cartBodySchema';

type Product = {
    category_id: number;
    product_id: string;
    title: string;
    price: number;
    image: string | null;
    quantity?: number;
    type: 'cardio' | 'machines' | 'free-weights';
};

export const getCartService = async (
    cartBody: CartBody
): Promise<Product[]> => {
    try {
        const cartIds = Object.keys(cartBody.cartItems);

        const cartPromises = cartIds.map(async (i) => {
            const product: Product = await db
                .select({
                    category_id: categories.category_id,
                    product_id: products.product_id,
                    title: products.title,
                    price: products.price,
                    image: products.image,
                    type: categories.type,
                })
                .from(products)
                .innerJoin(
                    categories,
                    eq(categories.category_id, products.category_id)
                )
                .where(eq(products.product_id, i))
                .then(takeUniqueOrThrow);

            if (product) {
                product.quantity = cartBody.cartItems[i];
            }
            return product;
        });

        return await Promise.all(cartPromises);
    } catch (error) {
        throw error;
    }
};
