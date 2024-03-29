import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';
import createOrder from '../../services/userService/ordersManagement';

export const getUserOrders = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;
    const { orderId } = req.query as { orderId?: string };

    const payload = {};
    // await getOrders(userId, orderId);

    res.status(200).json({ message: 'User orders', payload });
});

export const createUserOrder = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;
    const body = req.body;

    const payload = await createOrder(userId, body);

    res.status(201).json({ message: 'New order added', payload });
});
