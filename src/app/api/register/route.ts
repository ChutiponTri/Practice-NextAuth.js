import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: any) {
  try {
    await connectMongo();
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);     // (password, rounds)
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User register" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ message: "An error occurs during registration" }, { status: 500 })
  }
}