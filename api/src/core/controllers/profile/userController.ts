import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';

import { getUserProfileById } from '../../services/userService/getUser';
import { updateUser } from '../../services/userService/userManagement';

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
