import {
    user as user_,
    user_address,
    user_profile,
} from '../../../database/schemas/schema_user';
import { db } from '../../../config/database';
import { UserRegisterData } from '../../../typescript/interfaces/user.interface';
import { getUserByEmail, getUserById } from './getUser';
import { eq } from 'drizzle-orm';

//Todo make one function that will receive different fields and will query by them
export const createUser = async (userValues: UserRegisterData) => {
    try {
        const existingUser = await getUserByEmail(userValues.email);

        if (existingUser) throw new Error('Email is taken');

        const userId = await db.transaction(async (tx) => {
            try {
                const userRecord = await tx
                    .insert(user_)
                    .values({
                        email: userValues.email,
                        password: userValues.password,
                    })
                    .returning({ id: user_.id });
                const user_id = userRecord[0].id;

                const userProfile = await tx
                    .insert(user_profile)
                    .values({
                        user_id,
                        first_name: userValues.otherInfo.firstName,
                        last_name: userValues.otherInfo.lastName,
                        phone_number: userValues.otherInfo.phoneNumber,
                    })
                    .returning();

                await tx
                    .insert(user_address)
                    .values({ user_id: userProfile[0].profile_id });

                return userProfile[0].profile_id;
            } catch (error) {
                console.log(error);
                tx.rollback();
                throw error;
            }
        });

        return {
            email: userValues.email,
            fullName: userValues.otherInfo.firstName
                .concat(' ')
                .concat(userValues.otherInfo.lastName),
            id: userId,
        };
    } catch (error) {
        throw error;
    }
};

interface UserUpdateDataTypes {
    shippingInfo?: {
        city?: string;
        address?: string;
        country?: string;
        postcode?: number;
    };
    personalInfo?: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    };
}

export const updateUser = async (userId: string, body: UserUpdateDataTypes) => {
    try {
        const user = await getUserById(userId);

        if (!user) {
            throw new Error('User does not found!');
        }

        const { personalInfo } = body;

        const definedUserInfoFields = extractDefinedObj(personalInfo || {});

        if (Object.keys(definedUserInfoFields).length > 0) {
            await db
                .update(user_profile)
                .set({
                    profile_id: userId,
                    first_name: definedUserInfoFields.firstName,
                    last_name: definedUserInfoFields.lastName,
                    phone_number: definedUserInfoFields.phoneNumber,
                })
                .where(eq(user_profile.profile_id, userId));
        }

        return {
            ...definedUserInfoFields,
        };
    } catch (error) {
        throw error;
    }
};

function extractDefinedObj<T extends {}>(obj: T): T {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => {
        return value;
    });

    return Object.fromEntries(filteredEntries) as T;
}
