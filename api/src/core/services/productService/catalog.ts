import { SQLWrapper, and, asc, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { SearchQuery } from '../../../typescript/interfaces/query.interface';

import uploadImage from '../../utils/uploadImg';

import { db } from '../../../config/database';
import {
    categories,
    products,
} from '../../../database/schemas/schema_products';
import { NewProductType } from '../../../typescript/types/catalog.type';

export const insertCatalogData = async (
    data: NewProductType,
    file: Express.Multer.File
) => {
    try {
        const createdData = await db.transaction(async (tx) => {
            const imageUrl = await uploadImage(file as Express.Multer.File);

            const created = tx
                .insert(products)
                .values({
                    category_id: data.category_id,
                    description: data.description,
                    price: data.price,
                    title: data.title,
                    image: imageUrl,
                })
                .returning();

            return created;
        });

        return createdData;
    } catch (error) {
        throw error;
    }
};

export const getCatalogData = async (search: SearchQuery) => {
    const MAX_PERPAGE = 6;
    try {
        const table1Conditions: SQLWrapper[] = [];

        const category = search.category;
        const price = search.price;
        const sort = search.sort_by;
        const page = search.page || 1;
        const perPage = search.perPage || MAX_PERPAGE;

        const offset = (Number(page) - 1) * perPage;

        let queryBuilder = db
            .select({
                product_id: products.product_id,
                category_id: products.category_id,
                title: products.title,
                price: products.price,
                description: products.description,
                image: products.image,
                type: categories.type,
            })
            .from(categories)
            .innerJoin(
                products,
                eq(categories.category_id, products.category_id)
            );

        if (category) {
            table1Conditions.push(sql`${categories.type} = ${category}`);
        }

        if (price?.from) {
            table1Conditions.push(gte(products.price, price.from));
        }

        if (price?.to) {
            table1Conditions.push(lte(products.price, price.to));
        }

        if (sort) {
            const orderdByFunc = sort === 'asc' ? asc : desc;
            queryBuilder.orderBy(orderdByFunc(products.title));
        }

        const copy = queryBuilder.where(and(...table1Conditions));
        const length = (await copy).length;
        const result = await queryBuilder.limit(Number(perPage)).offset(offset);

        return {
            itemsLng: length,
            result: result.map((products) => ({ ...products, quantity: 1 })),
        };
    } catch (error) {
        throw error;
    }
};

//Testing purposes
export const _deleteData = async () => {
    try {
        await db.delete(products);
        console.log('Successful deletion');
    } catch (error) {
        console.log(error);
    }
};
