import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    insertCatalogController,
} from '../controllers/catalog';

import querryMiddlware from '../middlewares/extractQuerry';
import authChecker from '../middlewares/authentication';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/isAdmin';

const catalogRoute = Router();

catalogRoute.post(
    '/',
    authChecker,
    fileExtractionMiddlawere('image'),
    insertCatalogController
);
catalogRoute.get('/', querryMiddlware, getCatalogController);

catalogRoute.delete(`/`, isAdmin, deleteItemFromCatalog);

export default catalogRoute;
