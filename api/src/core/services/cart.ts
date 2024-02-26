import { db } from '../../config/database';
import { CartItems } from '../controllers/cart/cartController';

type Product =
    | {
          category_id: number;
          product_id: string;
          title: string;
          price: string;
          image: string | null;
          quantity?: number;
      }
    | undefined;

export const getCartDataService = async (
    ids: CartItems
): Promise<Product[]> => {
    try {
        const idsKeys = Object.keys(ids);

        const data = await Promise.all(
            idsKeys.map(async (i) => {
                const product: Product = await db.query.products.findFirst({
                    where(products, { eq }) {
                        return eq(products.product_id, i);
                    },
                    columns: {
                        description: false,
                    },
                });
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
