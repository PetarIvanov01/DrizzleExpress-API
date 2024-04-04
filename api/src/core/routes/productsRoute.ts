import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    getProductByIdController,
    insertCatalogController,
} from '../controllers/products/productsController';

import { authJWT } from '../middlewares/authJWT';

import querryMiddlware from '../middlewares/extractQuerry';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/isAdmin';

const catalogRoute = Router();

catalogRoute
    .route('/')
    .get(querryMiddlware, getCatalogController)
    .post(
        authJWT(),
        isAdmin,
        fileExtractionMiddlawere('image'),
        insertCatalogController
    )
    .delete(authJWT(), isAdmin, deleteItemFromCatalog);

catalogRoute.get('/:productId', getProductByIdController);

export default catalogRoute;
