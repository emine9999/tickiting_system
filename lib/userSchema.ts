import {z} from 'zod';

export const userSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters' })
        .max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z.string()
        .email({ message: 'Invalid email address' })
        .max(100, { message: 'Email cannot exceed 100 characters' }),
    role: z.enum(['USER', 'ADMIN', 'MANAGER']),
    group: z.string()
        .min(3, { message: 'Group must be at least 3 characters' })
        .max(50, { message: 'Group cannot exceed 50 characters' }),
        
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' }),

});