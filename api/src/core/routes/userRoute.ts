import { Router } from 'express';

import { authJWT } from '../middlewares/authJWT';
import isOwner from '../middlewares/guards/isOwner';

import {
    getCurrentUser,
    updateCurrentUser,
} from '../controllers/profile/userController';

import {
    createUserOrder,
    getUserOrders,
} from '../controllers/profile/orderController';

import {
    addAddressToUser,
    getUserAddresses,
    updateUserAddress,
} from '../controllers/profile/addressController';

import validateBody from '../middlewares/zodBodyValidator';
import { orderSchem } from '../schemas/orderSchema';

const userRoute = Router();

userRoute
    .route('/:userId')
    .all(authJWT(), isOwner)
    .get(getCurrentUser)
    .put(updateCurrentUser);

userRoute
    .route('/:userId/addresses')
    .all(authJWT(), isOwner)
    .get(getUserAddresses)
    .post(addAddressToUser)
    .put(updateUserAddress);

userRoute
    .route('/:userId/orders')
    .all(authJWT(), isOwner)
    .get(getUserOrders)
    .post(validateBody(orderSchem), createUserOrder);

export default userRoute;
