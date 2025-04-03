"use server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validationSchema";
import { registerSchema } from "@/lib/validationSchema";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { signIn,signOut } from "@/auth";
import { AuthError } from "next-auth";


export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials" };
  }

  const { email, password } = validation.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect : false,
    });
  } catch (error) {
    if (error instanceof AuthError) { 
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "An unexpected error occurred" };
      }
    }
    throw error;
  }
  return { success: true, message: "Logged in successfully" };
};


// ------------------------registerAction------------------------
export const registerAction = async (data: z.infer<typeof registerSchema>) => {
  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const { username, email, password } = validation.data;

  try {
    // Vérifier si l'utilisateur existe déjà
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { error: "Email already exists" };
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Connexion après l'inscription (DÉSACTIVER la redirection)
    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (loginResult?.error) {
      return { error: "Registration successful, but login failed." };
    }

    // Retourner une indication de succès et rediriger côté client
    return { success: "Registered and logged in successfully"};

  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred during registration" };
  }
};



//---------------------------------logoutAction---------------------------------

export const logoutAction = async () => {
  
  await signOut();

}