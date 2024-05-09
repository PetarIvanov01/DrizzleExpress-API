import { Response, Request } from 'express';

import {
    insertCatalogData,
    getCatalogData,
    _deleteData,
} from '../../services/productService/catalog';

import { RequestWithQueryData } from '../../../typescript/interfaces/query.interface';
import wrapController from '../../helpers/wrapperTryCatch';

export const insertCatalogController = wrapController(
    async (req: Request, res: Response) => {
        const data = req.body;
        const file = req.file;

        if (!file) {
            throw new Error('File is not provided');
        }
        //TODO Add body sanitizing
        const result = insertCatalogData(data, file);

        res.status(200).json({
            result,
        });
    }
);

export const getCatalogController = wrapController(
    async (req: RequestWithQueryData, res: Response) => {
        let searchBy = req.searchBy || {};
        const values = await getCatalogData(searchBy);

        res.status(200).json({
            itemsLng: values.itemsLng,
            result: values.result,
        });
    }
);

export const deleteItemFromCatalog = wrapController(
    async (req: Request, res: Response) => {
        try {
            _deleteData();

            res.status(204).json({
                message: 'Delete',
            });
        } catch (error) {
            throw error;
        }
    }
);
