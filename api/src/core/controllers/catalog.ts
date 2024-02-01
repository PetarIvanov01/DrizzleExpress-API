import { Response, Request, NextFunction } from 'express';

import {
    insertCatalogData,
    getProductId,
    getCatalogData,
    _deleteData,
} from '../services/catalog';

import { RequestWithQueryData } from '../../typescript/interfaces/query.interface';

export const insertCatalogController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

export const getCatalogController = async (
    req: RequestWithQueryData,
    res: Response
) => {
    try {
        let searchBy = req.searchBy || {};
        const values = await getCatalogData(searchBy);

        res.json({
            values,
        });
    } catch (error) {
        throw error;
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        if (!productId) return res.status(201).send();

        const product = await getProductId(productId);

        res.send(product);
    } catch (error) {
        throw error;
    }
};

export const deleteItemFromCatalog = async (req: Request, res: Response) => {
    try {
        _deleteData();

        res.json({
            message: 'Delete',
        });
    } catch (error) {
        throw error;
    }
};
