import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    getProductByIdController,
    insertCatalogController,
} from '../controllers/catalog';

import querryMiddlware from '../middlewares/extractQuerry';
import authChecker from '../middlewares/authentication';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';

const catalogRoute = Router();

catalogRoute
    .get('/', querryMiddlware, getCatalogController)
    .post(
        '/',
        authChecker,
        fileExtractionMiddlawere('image'),
        insertCatalogController
    )
    .delete(`/`, authChecker, deleteItemFromCatalog);

catalogRoute.get('/:itemId', getProductByIdController);
export default catalogRoute;
