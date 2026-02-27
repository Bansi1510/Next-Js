import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) {
          throw new Error("Email and password not found");
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("user not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Password is wrong");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXT_AUTH_SECRETE
}

export default authOptions;