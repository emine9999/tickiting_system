import {z} from 'zod'


 export const roleSchema = z.object({   
    name: z.enum(['ADMIN', 'MANAGER', 'USER'], {
        errorMap: () => ({ message: 'Role must be either ADMIN, MANAGER or USER' })
    }),
    description: z.string()
        .min(5, { message: 'Description must be at least 5 characters' })
        .max(100, { message: 'Description cannot exceed 100 characters' }),
    
    portee: z.string()
        .min(5, { message: 'Description must be at least 5 characters' })
        .max(100, { message: 'Description cannot exceed 100 characters' })

})
export type Role = z.infer<typeof roleSchema>