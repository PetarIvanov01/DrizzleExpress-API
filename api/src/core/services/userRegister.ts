import bcryptjs from "bcryptjs"

import { UserRegisterData } from "../../typescript/interfaces/user.interface";
import validateAuth from "../validations/validateAuth";
import { signJWT } from "../helpers/jwt.utils";
import { createUser } from "./user.queries";
import { ValidationError } from "../utils/Errors";

export interface UserCreateI {
    email: string,
    username: string,
    password: string
};
//Todo abstract the catch block  
const regService = async (userData: UserRegisterData) => {

    const errors = validateAuth(userData);
    try {
        if (errors.length > 0) throw errors;

        const { email, password, username } = userData;

        const userValues = {
            email,
            username,
            password: await bcryptjs.hash(password, 10)
        };

        const payload = await createUser(userValues);
        const token = signJWT(payload, '6h');

        return { ...payload, token };

    } catch (error: any) {
        throw new ValidationError('ValidationError', 'Register request faild', { ...error, message: error.message })
    }

};
export default regService;