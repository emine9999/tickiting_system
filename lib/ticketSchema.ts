import { z } from 'zod';

export const ticketSchema = z.object({
    title: z.string()
        .min(5, { message: 'Title must be at least 5 characters' })
        .max(100, { message: 'Title cannot exceed 100 characters' }),
        
    description: z.string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' })
        .regex(/^(?!\s*$).+/, { message: 'Description must contain at least one sentence' }),

    status: z.enum(['open', 'in-progress', 'closed', 'pending', 'rejected']),
    type: z.enum(['bug', 'feature', 'task'] ).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),

    assignedTo: z.string().email({ message: 'AssignedTo must be a valid email address' }).optional(),


});
