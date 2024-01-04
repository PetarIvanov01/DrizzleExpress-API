import { eq, sql } from "drizzle-orm";
import { db } from "../../config/database";
import { categories, products } from "../../database/schemas/schema_products";
import IFile from "../../typescript/interfaces/multer.interface";
import { SearchQuery } from "../../typescript/types/query.type";
type NewProduct = typeof products.$inferInsert;

export const insertCatalogData = async (data: NewProduct, file: IFile) => {

    try {
        const createdData = await db.insert(products).values({
            category_id: data.category_id,
            description: data.description,
            price: data.price,
            title: data.title,
            image: file.filename
        }).returning();
        return createdData;

    } catch (error) {
        throw error;
    };
};

//Todo set the proper interface for the query
export const getCatalogData = async (search: SearchQuery) => {
    try {

        if (Object.keys(search).length === 0) {
            return db.query.products.findMany();
        }

        const data = await db.select({
            products
        })
            .from(categories)
            .where(sql`${categories.type} = ${search.category}`)
            .innerJoin(products, eq(categories.category_id, products.category_id));

        return data.map(({ products }) => ({ ...products }));

    } catch (error) {
        throw error
    }
};