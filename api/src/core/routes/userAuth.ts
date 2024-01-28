import { Router } from 'express';
import {
    getCurrentUser,
    loginController,
    registerController,
} from '../controllers/userAuth';
import isAdmin from '../middlewares/isAdmin';

const userAuthRoute = Router();

userAuthRoute.get('/', isAdmin, getCurrentUser);

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);

export default userAuthRoute;
