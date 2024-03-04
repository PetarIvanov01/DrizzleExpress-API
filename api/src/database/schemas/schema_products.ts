import {
    serial,
    varchar,
    pgTable,
    numeric,
    text,
    uuid,
    integer,
} from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    category_id: serial('category_id').primaryKey(),
    type: varchar('type', { length: 50 })
        .notNull()
        .$type<'cardio' | 'machines' | 'free-weights'>(),
});

export const products = pgTable('products', {
    product_id: uuid('product_id').primaryKey().defaultRandom(),
    category_id: integer('category_id')
        .notNull()
        .references(() => categories.category_id),
    title: varchar('title', { length: 150 }).notNull(),
    price: numeric('price').notNull(),
    description: text('description').notNull(),
    image: text('image'),
});
