import { SQLWrapper, and, asc, desc, eq, gte, lte, sql } from 'drizzle-orm';

import { SearchQuery } from '../../typescript/interfaces/query.interface';
import IFile from '../../typescript/interfaces/multer.interface';

import { db } from '../../config/database';
import { categories, products } from '../../database/schemas/schema_products';
import { NewProductType } from '../../typescript/types/catalog.type';

export const insertCatalogData = async (data: NewProductType, file: IFile) => {
    try {
        const createdData = await db
            .insert(products)
            .values({
                category_id: data.category_id,
                description: data.description,
                price: data.price,
                title: data.title,
                image: file.filename,
            })
            .returning();
        return createdData;
    } catch (error) {
        throw error;
    }
};

export const getCatalogData = async (search: SearchQuery) => {
    try {
        if (Object.keys(search).length === 0) {
            return db.query.products.findMany();
        }
        const table1Conditions: SQLWrapper[] = [];

        const category = search.category;
        const price = search.price;
        const sort = search.sort;

        let queryBuilder = db
            .select({
                product_id: products.product_id,
                categoriy_id: products.category_id,
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
            //@ts-ignore
            table1Conditions.push(gte(products.price, price.from));
        }

        if (price?.to) {
            // @ts-ignore
            table1Conditions.push(lte(products.price, price.to));
        }

        if (sort) {
            const orderdByFunc = sort === 'asc' ? asc : desc;
            queryBuilder.orderBy(orderdByFunc(products.title));
        }

        const data = await queryBuilder.where(and(...table1Conditions));
        return data.map((products) => ({ ...products }));
    } catch (error) {
        throw error;
    }
};

export const getProductId = async (itemId: number) => {
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

//Testing purposes
export const _deleteData = async () => {
    try {
        await db.delete(products);
        console.log('Successful deletion');
    } catch (error) {
        console.log(error);
    }
};
