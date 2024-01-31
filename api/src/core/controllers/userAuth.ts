import { Request, Response } from 'express';
import {
    UserLoginData,
    UserRegisterData,
} from '../../typescript/interfaces/user.interface';
import wrapController from '../helpers/wrapperTryCatch';

import { getUserById } from '../services/userService/user.queries';
import loginService from '../services/userService/userLogin';
import regService from '../services/userService/userRegister';
import {
    signJWT,
    signJWT_Refresh,
    verifyJWT_Refresh,
} from '../helpers/jwt.utils';

const oneWeekInMilliseconds = 1000 * 60 * 60 * 24 * 7;

export const loginController = wrapController(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const extractedData: UserLoginData = {
            email,
            password,
        };

        const { payload, refreshToken } = await loginService(extractedData);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: oneWeekInMilliseconds,
        });

        res.status(200).json({ message: 'You are logged', payload });
    }
);

export const registerController = wrapController(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const otherInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        };

        const extractedData: UserRegisterData = {
            email,
            password,
            otherInfo,
        };

        const { payload, refreshToken } = await regService(extractedData);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: oneWeekInMilliseconds,
        });

        res.status(200).json({ message: 'You are registered', payload });
    }
);

export const getCurrentUser = wrapController(
    async (req: Request, res: Response) => {
        const userId = req.query.userId as string;

        const payload = await getUserById(userId);

        res.status(200).json(payload);
    }
);

export const refreshTokensController = wrapController(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) return res.status(401).send('Not authorized');

        try {
            const payload = verifyJWT_Refresh(refreshToken);
            const newAccesstoken = await signJWT(payload);
            const newRefreshToken = await signJWT_Refresh(payload);

            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                maxAge: oneWeekInMilliseconds,
            });

            res.status(200).send({
                ...payload,
                token: newAccesstoken,
            });
        } catch (error) {
            res.clearCookie('jwt', {
                httpOnly: true,
                maxAge: oneWeekInMilliseconds,
            });
            throw error;
        }
    }
);
