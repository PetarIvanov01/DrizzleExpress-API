import { Request, Response } from 'express';
import { getCartService } from '../../services/cart';
import { CartBody } from '../../schemas/cartBodySchema';

export const getCartController = async (req: Request, res: Response) => {
    try {
        const payload = req.body as CartBody;

        if (payload.length === 0) {
            return res.status(204).json({ cart: [] });
        }

        const items = await getCartService(payload);

        res.status(200).json({ cart: items });
    } catch (error: unknown) {
        throw error;
    }
};
