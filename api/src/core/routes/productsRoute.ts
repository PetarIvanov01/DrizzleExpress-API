import { Router } from 'express';

import {
    deleteItemFromCatalog,
    getCatalogController,
    getProductByIdController,
    insertCatalogController,
} from '../controllers/products/productsController';

import querryMiddlware from '../middlewares/extractQuerry';
import fileExtractionMiddlawere from '../middlewares/fileExtraction';
import isAdmin from '../middlewares/guards/isAdmin';

const catalogRoute = Router();

catalogRoute
    .route('/')
    .get(querryMiddlware, getCatalogController)
    .post(fileExtractionMiddlawere('image'), isAdmin, insertCatalogController)
    .delete(isAdmin, deleteItemFromCatalog);

catalogRoute.get('/:productId', getProductByIdController);

export default catalogRoute;
