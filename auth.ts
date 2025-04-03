import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { loginSchema } from "@/lib/validationSchema";
import * as bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

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
      // add this to the provider options
      async profile(profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (!user) {
          // Create a new user in your database
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
      if (user) {
        token.name = user.name; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name; 
      }
      return session;
    },
  },
});
