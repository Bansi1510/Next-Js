import connectDB from "@/app/lib/db";
import User from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Required all fields", success: false },
        { status: 400 }
      )
    }
    const existingUser = await User.find({ email })
    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "user already exsist", success: false },
        { status: 400 }
      )
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hashPassword
    })
    return NextResponse.json(
      {
        user,
        message: "User Register successfully",
        success: true
      },
      { status: 200 }

    )

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", success: false, error }
    )
  }
}