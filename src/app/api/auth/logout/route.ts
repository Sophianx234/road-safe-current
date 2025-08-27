import { getTokenFromRequest } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/setAuthCookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){
  try {

    /* const decoded = await getTokenFromRequest(req)
    console.log('ddksdkfiedd') */
    return setAuthCookie('logout','logout successfully')
  }catch(err){
    return NextResponse.json(err,{status:400})
  }
}