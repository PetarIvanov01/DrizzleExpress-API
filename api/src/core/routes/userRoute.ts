import { Router } from 'express';

import {
    getCurrentUser,
    updateCurrentUser,
} from '../controllers/profile/userController';
import {
    addAddressToUser,
    getUserAddresses,
    updateUserAddress,
} from '../controllers/profile/addressController';
import {
    createUserOrder,
    getUserOrders,
} from '../controllers/profile/orderController';

const userRoute = Router();

userRoute.get('/:userId', getCurrentUser);
userRoute.put('/:userId', updateCurrentUser);

userRoute.get('/address/:userId', getUserAddresses);
userRoute.post('/address/:userId', addAddressToUser);
userRoute.put('/address/:userId', updateUserAddress);

userRoute.get('/order/:userId', getUserOrders);
userRoute.post('/order/:userId', createUserOrder);
export default userRoute;
