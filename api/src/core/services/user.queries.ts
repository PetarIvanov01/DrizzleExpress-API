import { users } from "../../database/schemas/schema_user";
import { products } from "../../database/schemas/schema_products"
import { db } from "../../config/database";
import { UserRegisterData } from "../../typescript/interfaces/user.interface";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, email)
        });

        return {
            id: user?.id,
            email: user?.email,
            password: user?.password
        };

    } catch (error) {
        throw error;
    }
};

export const createUser = async (userValues: UserRegisterData) => {
    try {
        const user = await getUserByEmail(userValues.email);

        if (user.id) throw new Error('Email is taken');

        const createdUser = await db.insert(users).values(userValues).returning({ id: users.id });
        return {
            email: userValues.email,
            id: createdUser[0].id.toString()
        };

    } catch (error) {
        throw error;
    }
};