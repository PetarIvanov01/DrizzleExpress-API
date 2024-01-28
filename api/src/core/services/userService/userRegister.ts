import bcryptjs from 'bcryptjs';

import { UserRegisterData } from '../../../typescript/interfaces/user.interface';
import {
    validateAuth,
    validateRegisterOtherInfo,
} from '../../validations/validateAuth';
import { signJWT } from '../../helpers/jwt.utils';
import { createUser } from './user.queries';
import { ValidationError } from '../../utils/Errors';

//Todo abstract the catch block

const regService = async (userData: UserRegisterData) => {
    const errors = [
        validateAuth({
            email: userData.email,
            password: userData.password,
        }),
        validateRegisterOtherInfo(userData.otherInfo),
    ];

    try {
        if (errors[0].length > 0 && errors[1].length > 0) throw errors;

        const { email, password } = userData;

        const userValues = {
            email,
            password: await bcryptjs.hash(password, 10),
        };

        const payload = await createUser({
            ...userValues,
            otherInfo: { ...userData.otherInfo },
        });

        const token = signJWT(payload, '6h');

        return { ...payload, token };
    } catch (error: any) {
        throw new ValidationError('Register request faild', {
            ...error,
            message: error.message,
        });
    }
};
export default regService;
