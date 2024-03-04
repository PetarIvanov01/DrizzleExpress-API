import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
    schema: './src/database/schemas/*',
    out: './.drizzle/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: `postgres://postgres:password@localhost:5432/${process.env.DB_NAME}`,
    },
} satisfies Config;
