import { db } from "../../config/database"

export const getCartDataService = async (ids: number[]) => {
    try {

        const data = await Promise.all(ids.map(async i => {
            try {
                return await db.query.products.findFirst({
                    where(products, { eq }) {
                        return eq(products.product_id, i);
                    },
                    columns: {
                        description: false,
                    },
                })
            } catch (error) {
                throw error;
            }
        }
        ))

        return data.filter(el => el !== undefined);

    } catch (error) {
        throw error;
    }
}