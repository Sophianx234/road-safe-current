// app/api/signup/route.ts
import { encryptPassword } from "@/lib/bcrypt";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/connectDB";
import { signToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/setAuthCookies";
import User from "@/models/UserModel";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const username = formData.get("username") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const file = formData.get("file") as File | null;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // prevent duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPass = await encryptPassword(password);

    let avatarUrl: string | null = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult = await uploadBufferToCloudinary(
        buffer,
        undefined,
        "users"
      );
      avatarUrl = (uploadResult as UploadApiResponse).secure_url;
    }
    console.log('New user created:');

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      avatar: avatarUrl,
    });
    // Issue JWT
    const token = await signToken(newUser);
    // Set cookie
    return setAuthCookie(token, "Signup successful");

    // Avoid leaking password
  } catch (err: unknown) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
