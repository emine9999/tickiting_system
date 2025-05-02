import NextAuth ,{ DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { loginSchema } from "@/lib/validationSchema";
import * as bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";


declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session extends DefaultSession {
        user?: User;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      // add this to the provider options
      async profile(profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (!user) {
          
          const newUser = await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name,
              image: profile.picture,
            },
          });
          return newUser;
        }
        console.log("OAuth User Profile:", profile);
        return user;
      }
    }),
    Credentials({
      async authorize(data) {
        // this function is called when the user submits the login form
        // to check if the user exists in the database
        // and if the password is correct
        // data is the form data from the login form
        const validation = loginSchema.safeParse(data);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user && bcrypt.compareSync(password, user.password ?? "")) {
            return {
              id: user.id,
              name: user.username, 
              email: user.email,
              image: user.image,
            };
          }

        }
        return null;
        
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time sign in: fetch user's role from DB
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { role: true, name: true,id : true }, // only fetch needed fields
        });
  
        token.role = dbUser?.role;
        token.name = dbUser?.name ?? token.name;
      }
  
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.role = token.role; // Pass the role to the session
        session.user.id = token.sub; // Pass the user ID to the session
      }
  
      return session;
    }
  }
  
});
