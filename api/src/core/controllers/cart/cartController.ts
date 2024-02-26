import { Request, Response } from 'express';
import { getCartDataService } from '../../services/cart';

export interface CartItems {
    [key: string]: number;
}

export const getCartDataController = async (req: Request, res: Response) => {
    try {
        const itemsId = req.cookies['cart-cookie'];

        if (typeof itemsId !== 'string') {
            return res.status(204).json([]);
        }

        const parsedItemsObjectIds = JSON.parse(itemsId);
        const cartItems = parsedItemsObjectIds.cartItems as CartItems;

        const items = await getCartDataService(cartItems);

        res.status(200).send(items);
    } catch (error: unknown) {
        throw error;
    }
};
