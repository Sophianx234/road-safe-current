import { connectDB } from "@/lib/connectDB";
import Accident from "@/models/AccidentSchema";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export const getAllAccidents = async () => {
  try {
    connectDB();
    const accidents = await Accident.find();
    console.log(accidents)
    return Response.json(accidents,{
      status:200
    });
  } catch (error) {
    console.error("Error fetching accidents:", error);
    return Response.json({ message: "Internal Server Error" },{
      status: 500
    });
  }
}