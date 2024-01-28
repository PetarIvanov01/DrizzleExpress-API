import { users, users_info } from '../../../database/schemas/schema_user';
import { products } from '../../../database/schemas/schema_products';
import { db } from '../../../config/database';
import { UserRegisterData } from '../../../typescript/interfaces/user.interface';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, email),
        });

        return {
            id: user?.id,
            email: user?.email,
            password: user?.password,
        };
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId: string) => {
    try {
        const queryData = db
            .select({
                id: users.id,
                email: users.email,
                createdAt: users.createdAt,
                full_name: users_info.full_name,
                phoneNumber: users_info.phone_number,
            })
            .from(users)
            .innerJoin(users_info, eq(users_info.user_id, users.id));

        if (userId === undefined) {
            return await queryData;
        }

        queryData.where(eq(users.id, parseInt(userId)));

        return queryData;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userValues: UserRegisterData) => {
    try {
        const user = await getUserByEmail(userValues.email);

        if (user.id) throw new Error('Email is taken');

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
                const id = user[0].id;

                // @ts-ignore
                await tx.insert(users_info).values({ id, ...otherInfo });

                return id;
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });

        return {
            email: userValues.email,
            id: userId,
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
};
