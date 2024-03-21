import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';
import {
    getUserProfileById,
    getAddresses,
} from '../../services/userService/getUser';
import { updateUser } from '../../services/userService/userManagement';
import {
    createAddress,
    updateAddress,
} from '../../services/userService/addressManagement';

export const getCurrentUser = wrapController(
    async (req: Request, res: Response) => {
        const userId = req.params.userId as string;

        if (userId === undefined) return res.status(204).end();

        const payload = await getUserProfileById(userId);

        res.status(200).json(payload);
    }
);

export const updateCurrentUser = wrapController(
    async (req: Request, res: Response) => {
        const body = req.body;
        const { userId } = req.params;

        const updatedFields = await updateUser(userId, body);

        res.status(201).json({ message: 'Update user', updatedFields });
    }
);

export const getUserAddresses = wrapController(async function (
    req: Request,
    res: Response
) {
    const { userId } = req.params;
    const { addressId } = req.query as { addressId?: string };

    const payload = await getAddresses(userId, addressId);

    res.status(201).json({ message: 'All user addresses', payload });
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

    res.status(201).json({ message: 'New address added', payload });
});
