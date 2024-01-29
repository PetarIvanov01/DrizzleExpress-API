import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as user_schemas from '../database/schemas/schema_user';
import * as product_shemas from '../database/schemas/schema_products';

export const client = new Client({
    host:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_HOST
            : 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
    try {
        await client.connect();
        console.log('DB connected');
    } catch (err) {
        console.error(err);
        await client.end();
        process.exit(1);
    }
};
connectToDB();

export const db = drizzle(client, {
    schema: { ...user_schemas, ...product_shemas },
});
