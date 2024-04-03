import bcryptjs from 'bcryptjs';

import { UserRegisterData } from '../../../typescript/interfaces/user.interface';
import {
    validateAuth,
    validateRegisterOtherInfo,
} from '../../validations/validateAuth';
import { signJWT, signJWT_Refresh } from '../../helpers/jwt.utils';
import { createUser } from './userManagement';
import { ValidationError } from '../../utils/Errors';

const regService = async (userData: UserRegisterData) => {
    const errors = [
        ...validateAuth({
            email: userData.email,
            password: userData.password,
        }),
        ...validateRegisterOtherInfo(userData.otherInfo),
    ];

    try {
        if (errors.length > 0) throw errors;

        const { email, password } = userData;

        const userValues = {
            email,
            password: await bcryptjs.hash(password, 10),
            otherInfo: { ...userData.otherInfo },
        };

        const payload = await createUser(userValues);

        const token = await signJWT(payload);
        const refreshToken = await signJWT_Refresh(payload);

        return {
            payload: { ...payload, token },
            refreshToken,
        };
    } catch (error: any) {
        throw new ValidationError('Register request faild', {
            ...error,
            message: error.message,
        });
    }
};
export default regService;
