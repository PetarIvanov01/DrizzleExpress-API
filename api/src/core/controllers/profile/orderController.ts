import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';

import {
    createOrder,
    getOrders,
} from '../../services/userService/ordersManagement';

export const getUserOrders = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;
    const { orderId } = req.query as { orderId?: string };

    const payload = await getOrders(userId, orderId);

    res.status(200).json({ message: 'User orders', payload });
});

export const createUserOrder = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;

    await createOrder(userId, req.body);

    res.status(201).json({
        message: 'Order sucessfully created',
        body: req.body,
    });
});
