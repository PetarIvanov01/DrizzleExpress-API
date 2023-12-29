import { Response, Request } from "express";
import { getCatalogData, insertCatalogData } from "../services/catalog";

import IFile from "../../interface/multer.interface";

export const insertCatalogController = async (req: Request, res: Response) => {

    try {
        const data = req.body;
        const file = req.file as IFile;

        const result = await insertCatalogData(data, file);

        res.json({
            result
        });

    } catch (error) {
        res.json({ error });
    };
};

export const getCatalogController = async (req: Request, res: Response) => {
    try {
        const result = await getCatalogData();

        res.json({
            result
        });

    } catch (error) {
        res.json({ error });
    };
};