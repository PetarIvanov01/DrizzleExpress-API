import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    getProductByIdController,
    insertCatalogController,
} from '../controllers/products/productsController';

import querryMiddlware from '../middlewares/extractQuerry';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/isAdmin';

const catalogRoute = Router();

catalogRoute
    .route('/')
    .get(querryMiddlware, getCatalogController)
    .post(isAdmin, fileExtractionMiddlawere('image'), insertCatalogController)
    .delete(isAdmin, deleteItemFromCatalog);

catalogRoute.get('/:productId', getProductByIdController);

export default catalogRoute;
