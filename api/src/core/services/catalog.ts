import { db } from "../../config/database"
import { products } from "../../database/schemas/schema_products"
import IFile from "../../interface/multer.interface";

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

export const getCatalogData = async () => {
    try {
        return await db.query.products.findMany();
    } catch (error) {
        throw error
    };
};