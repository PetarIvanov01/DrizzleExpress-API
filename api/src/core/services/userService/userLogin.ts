import { compare } from 'bcryptjs';
import { Payload, signJWT, signJWT_Refresh } from '../../helpers/jwt.utils';
import { UserLoginData } from '../../../typescript/interfaces/user.interface';
import { validateAuth } from '../../validations/validateAuth';
import { ValidationError } from '../../utils/Errors';
import { getUserByEmail } from './getUser';

const loginService = async (userData: UserLoginData) => {
    const errors = validateAuth(userData);

    try {
        if (errors.length > 0) throw errors;

        const { email, password } = userData;

        const user = await getUserByEmail(email);

        if (user === null) throw new Error('Email or password are incorrect!');

        await verifyPassword(password, user.password);

        const payload: Payload = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        };

        const token = await signJWT(payload);
        const refreshToken = await signJWT_Refresh(payload);

        return {
            payload: { ...payload, token },
            refreshToken,
        };
    } catch (error: any) {
        throw new ValidationError('Login request faild', {
            ...error,
            message: error.message,
        });
    }
};
export default loginService;

const verifyPassword = async (
    originalPassword: string,
    passedPassword: string
): Promise<Error | void> => {
    try {
        const verifyPassword = await compare(originalPassword, passedPassword);
        if (verifyPassword === false)
            throw new Error('Email or password are incorrect!');
        return;
    } catch (error) {
        throw error;
    }
};
