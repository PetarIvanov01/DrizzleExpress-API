import { compare } from "bcryptjs"
import { db } from "../../config/database";
import { UserLoginData } from "../../interface/user.interface";
import validateAuth from "../validations/validateAuth";
import { createSession } from "../helpers/authUtil";


const loginService = async (userData: UserLoginData) => {

    const errors = validateAuth(userData);

    try {
        if (errors.length > 0) throw errors

        const { email, password } = userData;

        const user = await db.query.usserAcc.findFirst({
            where: (user, { eq }) => eq(user.email, email)
        })
        if (user === undefined) throw new Error('Email or password are incorrect!');

        const verifyPassword = await compare(password, user?.password);

        if (verifyPassword === false) throw new Error('Email or password are incorrect!');

        const token = createSession({ id: user.userId.toString(), username: user.username });

        return { username: user.username, token };

    } catch (error) {
        throw {
            message: 'Login request faild',
            error
        }
    }


}
export default loginService
