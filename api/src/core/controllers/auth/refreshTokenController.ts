import { Request, Response } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';
import { COOKIE_NAME, COOKIE_OPTIONS } from './_options';
import {
    signJWT,
    signJWT_Refresh,
    verifyJWT_Refresh,
} from '../../helpers/jwt.utils';

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
