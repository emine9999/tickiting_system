import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email({message:"Invalid email format"}),
    password: z
        .string()
        .min(8, {message:'Password must be at least 8 characters'})
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
});


export const registerSchema = z.object({
    username : z
        .string({
            required_error : "username is required",
            invalid_type_error :"username must be of type string"
        })
        .min(4,{message: "username must be at least 4 characters"}),
        
    email: z
        .string()
        .min(1, 'Email is required')
        .email({message:"Invalid email format"}),
    password: z
        .string()
        .min(8, {message:'Password must be at least 8 characters'})
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
});