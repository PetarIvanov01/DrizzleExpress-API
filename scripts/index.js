import _fetch, { File } from "node-fetch";
import getFiles from "./util.js";
import { readFileSync } from "fs";

const HTTP_URL = "http://localhost:5000/api/v1/catalog";
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
      const file = files[i];

      if (file.path !== data.image) {
        throw new Error("No such File");
      }

      const blob = new File([file.buffer], file.path);

      formData.set("image", blob, file.path);
      formData.set("category_id", data.category_id);
      formData.set("title", data.title);
      formData.set("description", data.description);
      formData.set("price", data.price);

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
