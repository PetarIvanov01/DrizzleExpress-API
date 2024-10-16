import {
    serial,
    varchar,
    pgTable,
    numeric,
    text,
    uuid,
    integer,
} from 'drizzle-orm/pg-core';

import { user_profile } from './schema_user';

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
        .references(() => categories.category_id, { onDelete: 'set null' }),
    title: varchar('title', { length: 150 }).notNull(),
    price: numeric('price').$type<number>().notNull(),
    description: text('description').notNull(),
    image: text('image'),
});

export const review = pgTable('reviews', {
    review_id: uuid('review_id').primaryKey().defaultRandom().notNull(),
    product_id: uuid('product_id')
        .references(() => products.product_id, {
            onDelete: 'cascade',
        })
        .notNull(),
    user_id: uuid('user_id')
        .references(() => user_profile.profile_id)
        .notNull(),
    rating: integer('rating').$type<1 | 2 | 3 | 4 | 5>().default(1).notNull(),
    review_text: text('review_text'),
});
