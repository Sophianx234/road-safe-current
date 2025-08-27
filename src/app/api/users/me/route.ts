// /app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getTokenFromRequest } from "@/lib/jwt";
import User from "@/models/UserModel";

// Replace with your actual secret
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    // Get the cookie

    const decoded = await getTokenFromRequest(req);

    if (!decoded) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch the user from your DB using decoded.id
    // For example, with Prisma:
    // const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    const user = await User.findById(decoded.userId).select("-password");

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
