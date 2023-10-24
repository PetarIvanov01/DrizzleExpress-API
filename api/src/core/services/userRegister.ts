import bcryptjs from "bcryptjs"

import { usserAcc } from "../../database/schemas/schema_user"
import { db } from "../../config/database";
import { UserRegisterData } from "../../interface/user.interface";
import validateAuth from "../validations/validateAuth";

import { createSession } from "../helpers/authUtil";

const regService = async (userData: UserRegisterData) => {

    const errors = validateAuth(userData);
    try {
        if (errors.length > 0) throw errors;

        const { email, password, username } = userData;
        
        const user = await db.query.usserAcc.findFirst({
            where: (user, { eq }) => eq(user.email, email)
        })

        if (user) throw { message: 'Email is taken!' };

        const userValues = {
            email,
            username,
            password: await bcryptjs.hash(password, 10)
        };

        const createdUser = await db.insert(usserAcc).values(userValues).returning({ id: usserAcc.userId });
        const token = createSession({ username, id: createdUser[0].id.toString() })
        
        return { username, token };

    } catch (error) {

        throw {
            message: 'Register request faild',
            error
        }
    }

}

export default regService