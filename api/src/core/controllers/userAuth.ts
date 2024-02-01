import { CookieOptions, Request, Response } from 'express';
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
const COOKIE_NAME = 'jwt-refresh';
const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: oneWeekInMilliseconds,
    sameSite: 'none',
    secure: true,
} as CookieOptions;

export const loginController = wrapController(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const extractedData: UserLoginData = {
            email,
            password,
        };

        const { payload, refreshToken } = await loginService(extractedData);

        res.cookie(COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

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

        res.cookie(COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

        res.status(200).json({ message: 'You are registered', payload });
    }
);

export const logoutController = wrapController(
    async (req: Request, res: Response) => {
        //TODO implement blacklisting in memory;
        res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS).status(201).json({
            message: 'Logout successful',
        });
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
        const refreshToken = req.cookies[COOKIE_NAME];

        if (!refreshToken)
            return res.status(401).json({ message: 'Not authorized' });

        try {
            const payload = verifyJWT_Refresh(refreshToken);
            const newAccesstoken = await signJWT(payload);
            const newRefreshToken = await signJWT_Refresh(payload);

            res.cookie(COOKIE_NAME, newRefreshToken, COOKIE_OPTIONS);

            res.status(200).json({
                message: 'Tokens successfully refreshed.',
                payload: { ...payload, token: newAccesstoken },
            });
        } catch (error) {
            res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS).status(401).json({
                error: 'Expired Token',
                message:
                    'Refresh token expired. Please log in again to obtain new tokens.',
            });
        }
    }
);
