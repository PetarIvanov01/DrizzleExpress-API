import { Request, Response } from 'express';
import { getCartDataService } from '../../services/cart';

export const getCartDataController = async (req: Request, res: Response) => {
    try {
        const itemsId = req.cookies['cart-cookie'];

        if (typeof itemsId !== 'string') {
            return res.json([]);
        }

        const parsedIDs = JSON.parse(itemsId);

        const items = await getCartDataService(parsedIDs);

        res.status(200).send(items);
    } catch (error: unknown) {
        throw error;
    }
};
