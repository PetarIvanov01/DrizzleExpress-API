import { user_address } from '../../../database/schemas/schema_user';
import { db } from '../../../config/database';
import { and, eq, sql } from 'drizzle-orm';
import { getAddresses, getUserById } from './getUser';
import { ValidationError } from '../../utils/Errors';

interface userAddressInterface {
    shippingInfo?: {
        city?: string;
        address?: string;
        country?: string;
        postcode?: number;
    };
}

export const createAddress = async (
    userId: string,
    body: userAddressInterface
) => {
    try {
        const existingUser = await getUserById(userId);

        if (!existingUser) throw new Error('User with that ID did not exist');

        const { shippingInfo } = body;

        const [countResult] = await db
            .select({
                count: sql`count(*)`.mapWith(Number).as('count'),
            })
            .from(user_address)
            .where(eq(user_address.user_id, userId));

        if (countResult.count >= 3) {
            throw new ValidationError(
                'You cannot add more than 3 addresses.',
                {}
            );
        }

        const userRecord = await db
            .insert(user_address)
            .values({
                user_id: userId,
                address: shippingInfo?.address,
                city: shippingInfo?.city,
                country: shippingInfo?.country,
                postcode: shippingInfo?.postcode,
            })
            .returning();

        return userRecord[0];
    } catch (error) {
        throw error;
    }
};

export const updateAddress = async (
    userId: string,
    body: userAddressInterface,
    addressId?: string
) => {
    try {
        const user = await getUserById(userId);

        if (!user) {
            throw new Error('User does not found!');
        }
        const address = await getAddresses(userId, addressId);

        if (!address) {
            throw new Error('Address does not found!');
        }
        const { shippingInfo } = body;

        const definedAddressFields = extractDefinedObj(shippingInfo || {});

        if (Object.keys(definedAddressFields).length > 0) {
            await db
                .update(user_address)
                .set({
                    ...definedAddressFields,
                })
                .where(
                    and(
                        eq(user_address.user_id, userId),
                        eq(user_address.address_id, Number(addressId))
                    )
                );
        }

        return {
            ...definedAddressFields,
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
