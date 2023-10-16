"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const client = new pg_1.Client({
    connectionString: 'postgres://postgres:password@localhost:5432/db_name'
});
const doMigrate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const db = (0, node_postgres_1.drizzle)(client);
    console.log('Start migration');
    yield (0, migrator_1.migrate)(db, {
        migrationsFolder: "drizzle"
    })
        .then(() => {
        console.log("Migrations complete!");
        process.exit(0);
    })
        .catch((err) => {
        console.error("Migrations failed!", err);
        process.exit(1);
    });
});
doMigrate();
