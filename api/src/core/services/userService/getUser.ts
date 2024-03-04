import { user, user_profile } from '../../../database/schemas/schema_user';
import { db } from '../../../config/database';
import { eq, sql } from 'drizzle-orm';

interface UserReturnData {
    id: string;
    email: string;
    fullName: string;
    password: string;
}

export const getUserByEmail = async (
    email: string
): Promise<UserReturnData | null> => {
    try {
        const userRecord = await db
            .select({
                profile_id: user_profile.profile_id,
                email: user.email,
                password: user.password,
                full_name: sql<string>`concat(${user_profile.first_name},' ',${user_profile.last_name})`,
            })
            .from(user)
            .innerJoin(user_profile, eq(user.id, user_profile.user_id))
            .where(eq(user.email, email));

        if (userRecord[0] === undefined) {
            return null;
        }
        return {
            id: userRecord[0].profile_id,
            email: userRecord[0].email,
            fullName: userRecord[0].full_name,
            password: userRecord[0].password,
        };
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId: string) => {
    try {
        const queryData = await db
            .select({
                id: user_profile.profile_id,
                email: user.email,
                createdAt: user.createdAt,
                full_name: sql<string>`concat(${user_profile.first_name},' ',${user_profile.last_name})`,
                phoneNumber: user_profile.phone_number,
            })
            .from(user)
            .innerJoin(user_profile, eq(user_profile.user_id, user.id))
            .where(eq(user_profile.profile_id, userId));

        return queryData[0];
    } catch (error) {
        throw error;
    }
};
