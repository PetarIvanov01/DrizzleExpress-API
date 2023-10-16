import "dotenv/config";
import "./config/database";
import express from "express";
import expressConfig from "./config/express";
import routerConfig from "./config/router";

main();
async function main() {
    const app = express();

    try {

        expressConfig(app);
        routerConfig(app);

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${process.env.PORT}`);
        });

    }
    catch (error) {
        console.log(error)
        process.exit(1);
    }
}