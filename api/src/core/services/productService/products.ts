import { db } from '../../../config/database';

export const getProductById = async (itemId: string) => {
    try {
        const item = await db.query.products.findFirst({
            where({ product_id }, { eq }) {
                return eq(product_id, itemId);
            },
        });

        return item;
    } catch (error) {
        throw error;
    }
};
