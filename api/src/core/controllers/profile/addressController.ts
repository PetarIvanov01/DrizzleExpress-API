import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';

import { getAddresses } from '../../services/userService/getUser';
import {
    createAddress,
    updateAddress,
} from '../../services/userService/addressManagement';

export const getUserAddresses = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;
    const { addressId } = req.query as { addressId?: string };

    const payload = await getAddresses(userId, addressId);

    res.status(200).json({ message: 'All user addresses', payload });
});

export const addAddressToUser = wrapController(async function (
    req: Request,
    res: Response
) {
    const body = req.body;
    const { userId } = req.params;

    const payload = await createAddress(userId, body);

    res.status(201).json({ message: 'New address added', payload });
});

export const updateUserAddress = wrapController(async function (
    req: Request,
    res: Response
) {
    const body = req.body;
    const { userId } = req.params;
    const { addressId } = req.query as { addressId?: string };

    const payload = await updateAddress(userId, body, addressId);

    res.status(200).json({
        message: `Address ${addressId} is update`,
        payload,
    });
});
