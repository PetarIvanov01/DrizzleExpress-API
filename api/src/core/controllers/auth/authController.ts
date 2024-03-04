import { Request, Response } from 'express';
import {
    UserLoginData,
    UserRegisterData,
} from '../../../typescript/interfaces/user.interface';
import wrapController from '../../helpers/wrapperTryCatch';

import loginService from '../../services/userService/userLogin';
import regService from '../../services/userService/userRegister';

import { ValidationError } from '../../utils/Errors';
import { COOKIE_NAME, COOKIE_OPTIONS } from './_options';

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
        const { email, password, rePassword } = req.body;

        if (rePassword === undefined || password !== rePassword) {
            throw new ValidationError('Register request faild', {
                message: "Password doesn't matched!",
            });
        }

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
