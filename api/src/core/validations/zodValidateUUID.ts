import { z } from 'zod';

import { ValidationError } from '../utils/Errors';

export default function validateUUID(value: string): never | void {
    const response = z.string().uuid().safeParse(value);

    if (!response.success) {
        throw new ValidationError('Invalid ID', null);
    }
}
