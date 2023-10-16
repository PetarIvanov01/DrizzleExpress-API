import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg";

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
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

export const db = drizzle(client);
