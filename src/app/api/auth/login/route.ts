// /pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { verifyPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/setAuthCookies";



export async function POST(req: NextRequest, res: NextResponse) {
  try{

    
    const { email, password } = await req.json();

  if (!email  || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  // create JWT
  const user = await User.findOne({email}).select("+password");
  if (!user) {  
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  } 
  const isPasswordValid = await verifyPassword(password,user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const token = await signToken(user)
  return setAuthCookie(token)
  // set cookie
  
}catch(err){
  console.log(err)
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });  
}
}
