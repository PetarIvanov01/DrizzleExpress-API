import { Router } from 'express';
import {
    getCurrentUser,
    loginController,
    logoutController,
    registerController,
} from '../controllers/auth/authController';
import { refreshTokensController } from '../controllers/auth/refreshTokenController';
import isAdmin from '../middlewares/isAdmin';

const userAuthRoute = Router();

userAuthRoute.get('/', isAdmin, getCurrentUser);

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);
userAuthRoute.post('/logout', logoutController);

userAuthRoute.post('/refreshtoken', refreshTokensController);

export default userAuthRoute;
