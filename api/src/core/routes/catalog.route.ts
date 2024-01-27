import { Router } from "express";

import {
    deleteItemFromCatalog,
    getCatalogController,
    insertCatalogController
} from "../controllers/catalog";

import querryMiddlware from "../middlewares/extractQuerry";
import authChecker from "../middlewares/authentication";
import fileExtractionMiddlawere from "../middlewares/fileExtraction";

const catalogRoute = Router();

catalogRoute.post('/', authChecker, fileExtractionMiddlawere('image'), insertCatalogController);
catalogRoute.get('/',
    querryMiddlware,
    getCatalogController);

catalogRoute.delete(`/`, authChecker, deleteItemFromCatalog);

export default catalogRoute;