import { CartItems } from '../controllers/cart/cartController';
import takeUniqueOrThrow from '../utils/takeUniqueOrThrow';

import { db } from '../../config/database';
import { categories, products } from '../../database/schemas/schema_products';
import { eq } from 'drizzle-orm';

type Product =
    | {
          category_id: number;
          product_id: string;
          title: string;
          price: number;
          image: string | null;
          quantity?: number;
          type: 'cardio' | 'machines' | 'free-weights';
      }
    | undefined;

export const getCartDataService = async (
    ids: CartItems
): Promise<Product[]> => {
    try {
        const idsKeys = Object.keys(ids);

        const data = await Promise.all(
            idsKeys.map(async (i) => {
                const product: Product | undefined = await db
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
                    product.quantity = ids[i];
                }
                return product;
            })
        );

        return data.filter((el) => el !== undefined);
    } catch (error) {
        throw error;
    }
};
