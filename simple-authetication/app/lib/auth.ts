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
      async authorize(credentials, req) {
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
      },
    })
  ],
  callbacks: {

  },
  session: {

  },
  pages: {

  },
  secret: "bansiparmar"
}

export default authOptions;