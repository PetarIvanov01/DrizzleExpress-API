import { Router } from 'express';
import {
    loginController,
    logoutController,
    registerController,
} from '../controllers/auth/authController';
import { refreshTokensController } from '../controllers/auth/refreshTokenController';
import { authJWT } from '../middlewares/authJWT';

const userAuthRoute = Router();

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);
userAuthRoute.post('/logout', authJWT(), logoutController);

userAuthRoute.post('/refreshtoken', refreshTokensController);

export default userAuthRoute;
