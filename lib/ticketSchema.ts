import { z } from 'zod';

export const ticketSchema = z.object({
    title: z.string()
        .min(5, { message: 'Title must be at least 5 characters' })
        .max(100, { message: 'Title cannot exceed 100 characters' }),
        
    description: z.string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' })
        .regex(/^(?!\s*$).+/, { message: 'Description must contain at least one sentence' }),

    status: z.enum(['OPEN', 'CLOSED', 'IN PROGRESS', 'PENDING', 'REJECTED']),
    type: z.enum(['BUG', 'FEATURE', 'TASK'] ).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),

    assignedTo: z.string().email({ message: 'AssignedTo must be a valid email address' }).optional(),


});
