import { Router } from 'express';
import {
    loginController,
    logoutController,
    registerController,
} from '../controllers/auth/authController';
import { refreshTokensController } from '../controllers/auth/refreshTokenController';

import {
    addAddressToUser,
    getCurrentUser,
    getUserAddresses,
    updateCurrentUser,
    updateUserAddress,
} from '../controllers/profile/userController';

const userAuthRoute = Router();

userAuthRoute.get('/:userId', getCurrentUser);
userAuthRoute.put('/:userId', updateCurrentUser);

userAuthRoute.get('/address/:userId', getUserAddresses);
userAuthRoute.post('/address/:userId', addAddressToUser);
userAuthRoute.put('/address/:userId', updateUserAddress);

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);
userAuthRoute.post('/logout', logoutController);

userAuthRoute.post('/refreshtoken', refreshTokensController);

export default userAuthRoute;
