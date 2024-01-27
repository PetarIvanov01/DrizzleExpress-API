import { Response, Request } from 'express';
import IFile from '../../typescript/interfaces/multer.interface';

import {
    getCatalogData,
    getProductId,
    insertCatalogData,
} from '../services/catalog';
import { _deleteData } from '../services/userService/user.queries';
import { RequestWithQueryData } from '../../typescript/interfaces/query.interface';

export const insertCatalogController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const file = req.file as IFile;

        const result = await insertCatalogData(data, file);

        res.json({
            result,
        });
    } catch (error) {
        throw error;
    }
};

export const getCatalogController = async (
    req: RequestWithQueryData,
    res: Response
) => {
    try {
        let searchBy = req.searchBy || {};
        console.log(searchBy);
        const values = await getCatalogData(searchBy);

        res.json({
            values,
        });
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

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.itemId;
        if (!productId) return res.status(201).send();

        const product = await getProductId(Number(productId));

        res.send(product);
    } catch (error) {
        throw error;
    }
};
