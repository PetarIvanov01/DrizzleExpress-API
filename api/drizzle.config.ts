import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
    schema: './src/database/schemas/*',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgres://postgres:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    },
} satisfies Config;
