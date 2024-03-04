import { Router } from 'express';
import {
    loginController,
    logoutController,
    registerController,
} from '../controllers/auth/authController';
import { refreshTokensController } from '../controllers/auth/refreshTokenController';
import isAdmin from '../middlewares/isAdmin';
import {
    getCurrentUser,
    updateCurrentUser,
} from '../controllers/profile/userController';

const userAuthRoute = Router();

userAuthRoute.get('/:userId', isAdmin, getCurrentUser);
userAuthRoute.put('/:userId', updateCurrentUser);

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);
userAuthRoute.post('/logout', logoutController);

userAuthRoute.post('/refreshtoken', refreshTokensController);

export default userAuthRoute;
