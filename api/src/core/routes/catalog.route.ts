import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    insertCatalogController,
} from '../controllers/catalog';

import querryMiddlware from '../middlewares/extractQuerry';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/isAdmin';

const catalogRoute = Router();

catalogRoute.post(
    '/',
    isAdmin,
    fileExtractionMiddlawere('image'),
    insertCatalogController
);
catalogRoute.get('/', querryMiddlware, getCatalogController);

catalogRoute.delete(`/`, isAdmin, deleteItemFromCatalog);

export default catalogRoute;
