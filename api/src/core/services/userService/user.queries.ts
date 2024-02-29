import {
    users,
    users_info,
    users_address,
} from '../../../database/schemas/schema_user';
import { db } from '../../../config/database';
import { UserRegisterData } from '../../../typescript/interfaces/user.interface';
import { eq } from 'drizzle-orm';

interface UserReturnData {
    id: string;
    email: string;
    fullName: string;
    password: string;
}
interface UserUpdateDataTypes extends UserRegisterData {
    city?: string;
    address?: string;
    country?: string;
    zip?: number;
}

export const getUserByEmail = async (
    email: string
): Promise<UserReturnData | null> => {
    try {
        const user = await db
            .select({
                id: users.id,
                email: users.email,
                password: users.password,
                full_name: users_info.full_name,
            })
            .from(users)
            .innerJoin(users_info, eq(users.id, users_info.user_id))
            .where(eq(users.email, email));

        if (user[0] === undefined) {
            return null;
        }
        return {
            id: user[0]?.id,
            email: user[0]?.email,
            fullName: user[0]?.full_name,
            password: user[0]?.password,
        };
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId: string) => {
    try {
        const queryData = await db
            .select({
                id: users.id,
                email: users.email,
                createdAt: users.createdAt,
                fullName: users_info.full_name,
                phoneNumber: users_info.phone_number,
            })
            .from(users)
            .innerJoin(users_info, eq(users_info.user_id, users.id))
            .where(eq(users.id, userId));

        return queryData[0];
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userValues: UserRegisterData) => {
    try {
        const user = await getUserByEmail(userValues.email);

        if (user) throw new Error('Email is taken');

        const otherInfo = {
            full_name: userValues.otherInfo.firstName
                .concat(' ')
                .concat(userValues.otherInfo.lastName),
            phone_number: userValues.otherInfo.phoneNumber,
        };

        const userId = await db.transaction(async (tx) => {
            try {
                const user = await tx
                    .insert(users)
                    .values(userValues)
                    .returning({ id: users.id });
                const user_id = user[0].id;

                await tx.insert(users_info).values({ user_id, ...otherInfo });

                return user_id;
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });

        return {
            email: userValues.email,
            fullName: otherInfo.full_name,
            id: userId,
        };
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (
    userId: string,
    userData: UserUpdateDataTypes
) => {
    try {
        const user = await getUserById(userId);

        if (user === null) {
            throw new Error('User does not found!');
        }
    } catch (error) {
        throw error;
    }
};
