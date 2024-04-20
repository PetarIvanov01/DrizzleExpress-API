import "dotenv/config.js";
import _fetch, { File } from "node-fetch";
import getFiles from "./util.js";
import { readFileSync } from "fs";

let HTTP_URL = process.env.NODE_ENV.includes("production")
  ? process.env.PRODUCTION_ULR
  : process.env.LOCAL_URL;

const ADMIN_EMAIL = process.env.ADMIN;

const mockData = JSON.parse(
  readFileSync("./products.json", {
    encoding: "utf-8",
  })
);

async function requester(method, formData = {}) {
  try {
    console.log(`Sending ${method} request to ${HTTP_URL}`);
    const request = await _fetch(HTTP_URL, {
      method,
      body: formData,
    });

    if (request.ok === false) {
      throw await request.json();
    }

    console.log("Request successful. Response:");
    console.log(await request.json());
  } catch (error) {
    console.error("Error during request:");
    console.error(error);
    process.exit(1);
  }
}

async function createFormData() {
  try {
    const files = await getFiles();
    const formData = new FormData();

    console.log(`Loading data for ${mockData.length} products...`);

    for (let i = 0; i < mockData.length; i++) {
      const data = mockData[i];
      const file = files.find((el) => el.path === data.image);

      if (!file) {
        throw new Error("No such File");
      }

      const blob = new File([file.buffer], file.path);

      formData.set("image", blob, file.path);
      formData.set("category_id", data.category_id);
      formData.set("title", data.title);
      formData.set("description", data.description);
      formData.set("price", data.price);
      formData.set("email", ADMIN_EMAIL);

      await requester("POST", formData);
    }

    console.log("Products data successfully loaded");
  } catch (error) {
    console.error("Error during data loading:");
    console.error(error);
    process.exit(1);
  }
}

createFormData();
