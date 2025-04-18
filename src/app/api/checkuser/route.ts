import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongo } from "@/lib/mongodb";

export async function POST(req: any) {
  try {
    await connectMongo();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "An error occurs during registration" }, { status: 500 })
  }
}