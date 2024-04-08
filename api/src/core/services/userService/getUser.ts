import { user, user_profile } from '../../../database/schemas/schema_user';
import { db } from '../../../config/database';
import { eq, sql } from 'drizzle-orm';
import { UserReturnData } from '../../../typescript/interfaces/user.interface';

import takeUniqueOrThrow from '../../utils/takeUniqueOrThrow';

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
                type: user.type,
            })
            .from(user)
            .innerJoin(user_profile, eq(user.id, user_profile.user_id))
            .where(eq(user.email, email))
            .then(takeUniqueOrThrow);

        if (userRecord === undefined) {
            return null;
        }
        return {
            id: userRecord.profile_id,
            email: userRecord.email,
            fullName: userRecord.full_name,
            password: userRecord.password,
            type: userRecord.type,
        };
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId: string) => {
    try {
        const queryData = await db.query.user_profile.findFirst({
            where({ profile_id }, { eq }) {
                return eq(profile_id, userId);
            },
        });
        return queryData;
    } catch (error) {
        throw error;
    }
};

export const getUserProfileById = async (userId: string) => {
    try {
        const record = await db
            .select({
                email: user.email,
                firstName: user_profile.first_name,
                lastName: user_profile.last_name,
                phoneNumber: user_profile.phone_number,
            })
            .from(user)
            .innerJoin(user_profile, eq(user_profile.user_id, user.id))
            .where(eq(user_profile.profile_id, userId));

        return record[0];
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const getAddresses = async (userId: string, addressId?: string) => {
    try {
        if (addressId) {
            return db.query.user_address.findFirst({
                where({ address_id }, { eq }) {
                    return eq(address_id, Number(addressId));
                },
            });
        }
        const addresses = db.query.user_address.findMany({
            where({ user_id }, { eq }) {
                return eq(user_id, userId);
            },
        });

        return addresses;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
