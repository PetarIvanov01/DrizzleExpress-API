import { Response, Request } from "express";
import { RequestWithQueryData } from "../middlewares/extractQuerry";
import IFile from "../../typescript/interfaces/multer.interface";

import { getCatalogData, insertCatalogData } from "../services/catalog";

export const insertCatalogController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const file = req.file as IFile;

        const result = await insertCatalogData(data, file);

        res.json({
            result
        });

    } catch (error) {
        throw error;
    };
};

export const getCatalogController = async (req: RequestWithQueryData, res: Response) => {
    try {
        let searchBy = req.searchBy || {};

        const values = await getCatalogData(searchBy);

        res.json({
            values
        });

    } catch (error: unknown) {
        throw error;
    };
};