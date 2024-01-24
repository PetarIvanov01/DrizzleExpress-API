import { Request, Response } from "express";
import { getCartDataService } from "../services/cart";
import validateItemsStringId from "../validations/validateStringIds";

export const getCartDataController = async (req: Request, res: Response) => {
    try {

        const itemsId = req.body.ids;

        if (itemsId === undefined || validateItemsStringId(itemsId) === false) return res.json([]);

        const parsedIDs = JSON.parse(itemsId);
        const items = await getCartDataService(parsedIDs);

        res.
            status(200)
            .send(items);

    } catch (error: unknown) {
        throw error;
    };
};

