import {z} from 'zod';

export const groupSchema = z.object({
    name: z.string()
        .min(3, { message: 'Group must be at least 3 characters' })
        .max(20, { message: 'Group cannot exceed 20 characters' }),
    description: z.string()
        .min(5, { message: 'Description must be at least 5 characters' })
        .max(100, { message: 'Description cannot exceed 100 characters' })
});