import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';

import {
    getUserById,
    updateUser,
} from '../../services/userService/user.queries';

export const getCurrentUser = wrapController(
    async (req: Request, res: Response) => {
        const userId = req.params.userId as string;

        if (userId === undefined) return res.status(204).end();

        const payload = await getUserById(userId);

        res.status(200).json(payload);
    }
);

export const updateCurrentUser = wrapController(
    async (req: Request, res: Response) => {
        const body = req.body;

        // await updateUser('dad',{});

        res.status(201).json({ message: 'Update user' });
    }
);
