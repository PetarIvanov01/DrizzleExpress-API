import { Express, urlencoded, static as _static } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

export default function expressConfig(app: Express) {
  app.use(cors({ credentials: true }));
  app.use(bodyParser.json());
  app.use(urlencoded({ extended: true }));

  app.use(_static("public"));

  app.use(cookieParser());
}
