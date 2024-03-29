import { Response, Request, NextFunction } from 'express';

import {
    insertCatalogData,
    getProductId,
    getCatalogData,
    _deleteData,
} from '../../services/catalog';

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

        res.json({
            itemsLng: values.itemsLng,
            result: values.result,
        });
    }
);

export const getProductByIdController = wrapController(
    async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) return res.status(204).json({});

        const result = await getProductId(productId);

        res.status(200).json({ result });
    }
);

export const deleteItemFromCatalog = wrapController(
    async (req: Request, res: Response) => {
        try {
            _deleteData();

            res.json({
                message: 'Delete',
            });
        } catch (error) {
            throw error;
        }
    }
);
