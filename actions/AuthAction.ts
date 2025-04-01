"use server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validationSchema";
import { registerSchema } from "@/lib/validationSchema";
import { z } from "zod";
import *  as bcrypt from 'bcryptjs';

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  // Simulate server-side login logic
  try {
    // Replace this with actual login logic (e.g., database query, API call)
    return { success: "Logged in successfully" };
  } catch (error) {
    return { error: "An unexpected error occurred during login" };
  }
};

export const registerAction = async (data: z.infer<typeof registerSchema>) => {
  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const { username, email, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { error: "Email already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { success: "Registered successfully" };
  } catch (error) {
    console.error("Registration error:", error); 
    return { error: "An unexpected error occurred during registration" };
  }
};