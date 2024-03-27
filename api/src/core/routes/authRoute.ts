import { Router } from 'express';
import {
    loginController,
    logoutController,
    registerController,
} from '../controllers/auth/authController';
import { refreshTokensController } from '../controllers/auth/refreshTokenController';

const userAuthRoute = Router();

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);
userAuthRoute.post('/logout', logoutController);

userAuthRoute.post('/refreshtoken', refreshTokensController);

export default userAuthRoute;
