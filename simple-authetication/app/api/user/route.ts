import authOptions from "@/app/lib/auth";
import connectDB from "@/app/lib/db";
import User from "@/app/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json(
        { message: " session not found" },
        { status: 401 }
      )
    }

    const user = await User.findById(session?.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      user, { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { message: `server error: ${error}` },
      { status: 500 }
    )
  }
}