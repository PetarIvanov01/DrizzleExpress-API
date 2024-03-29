import { db } from '../../../config/database';
import { and, eq, sql } from 'drizzle-orm';

import {
    order_info,
    order_product_info,
    order_status,
    user_order_address,
    user_order_personal_info,
} from '../../../database/schemas/schema_orders';

import { getUserById } from './getUser';

export default async function createOrder(userId: string, body: any) {
    try {
        const existingUser = await getUserById(userId);

        if (!existingUser) throw new Error('User with that ID did not exist');

        /*

        ? Interface for the body that comes in an argument
        * Validate body existince(all fields should be defined) 
        * If some field is missing throw error(missing fields, "Not allowed")

        ! Use transaction to perform all queries
        ! If error rollback the transaction

        - 1. Create order
        - 2. Get order id 
        - 3. Set order id in the user_order_personal_info table with the other fields
        - 4. Set order id in the user_order_address table with the other fields
        - 5. Set order id in the order_product_info table with the other fields

        */

        return {};
    } catch (error) {
        throw error;
    }
}

interface Order {
    order_status: {
        status_name: string;
    };
    order_info: {
        user_id: string;
        total_price: string;
        status_id: string;
        order_date: string;
    };
    user_order_personal_info: {
        full_name: string;
        phone_number: string;
        order_id: string;
    };
    user_order_address: {
        order_id: string;
        country: string;
        city: string;
        address: string;
        postcode: number;
    };
    order_product_info: {
        order_id: string;
        product_id: string;
        quantity: string;
        subtotal: string;
    };
}
