import uploadImage from "@/app/lib/cloudinary";
import connectDB from "@/app/lib/db"
import User from "@/app/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session || !session.user.id || !session.user.email) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as Blob | null;

    let imageUrl = session.user.image ?? null
    if (file) {
      imageUrl = await uploadImage(file);
    }
    const user = await User.findByIdAndUpdate(session.user.id, {
      name, image: imageUrl
    }, { new: true })

    if (!user) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      user,
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    )
  }
}
