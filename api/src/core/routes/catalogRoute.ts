import { Router } from 'express';

import querryMiddlware from '../middlewares/extractQuerry';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/guards/isAdmin';

import {
    deleteItemFromCatalog,
    getCatalogController,
    insertCatalogController,
} from '../controllers/products/catalogController';

const catalogRoute = Router();

catalogRoute
    .route('/')
    .get(querryMiddlware, getCatalogController)
    .post(fileExtractionMiddlawere('image'), isAdmin, insertCatalogController)
    .delete(isAdmin, deleteItemFromCatalog);

export default catalogRoute;
