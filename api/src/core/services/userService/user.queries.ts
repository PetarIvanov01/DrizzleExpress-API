import { users, users_info } from "../../../database/schemas/schema_user";
import { products } from "../../../database/schemas/schema_products"
import { db } from "../../../config/database";
import { UserRegisterData } from "../../../typescript/interfaces/user.interface";

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

export const getUserById = async (userId: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.id, parseInt(userId))
        });

        if (!user) throw new Error('Invalid Id');

        return {
            id: user?.id,
            email: user?.email,
        };

    } catch (error) {
        throw error;
    }
};

export const createUser = async (userValues: UserRegisterData) => {
    try {
        const user = await getUserByEmail(userValues.email);

        if (user.id) throw new Error('Email is taken');

        const otherInfo = {
            full_name: userValues.otherInfo.firstName.concat(' ').concat(userValues.otherInfo.lastName),
            phone_number: userValues.otherInfo.phoneNumber
        }

        const userId = await db.transaction(async (tx) => {
            try {

                const user = await tx.insert(users).values(userValues).returning({ id: users.id });
                const id = user[0].id;

                await tx.insert(users_info).values({ id, ...otherInfo });

                return id;

            } catch (error) {
                tx.rollback();
                throw error;
            }
        });

        return {
            email: userValues.email,
            id: userId
        };

    } catch (error) {
        throw error;
    }
};

//Testing purposes
export const _deleteData = async (): Promise<void> => {
    try {

        await db.delete(products);
        console.log('Successful deletion');

    } catch (error) {
        console.log(error);
    }
}