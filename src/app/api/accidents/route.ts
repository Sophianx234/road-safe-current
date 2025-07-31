// /api/accidents/route.ts

import { connectDB } from "@/lib/connectDB";
import Accident from "@/models/AccidentSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { year, vehicleType, accidentType, region, severity } = body;

    const query: any = {};

    if (year && year !== "All") query.year = parseInt(year);
    if (vehicleType && vehicleType !== "All") query.vehicleType = vehicleType;
    if (accidentType && accidentType !== "All") query.accidentType = accidentType;
    if (region && region !== "All") query.region = region;
    if (severity && severity !== "All") query.severity = severity;
    console.log('query',query)
    const accidents = await Accident.find(query);
    return NextResponse.json({ accidents }, { status: 200 });

  } catch (error) {
    console.error("Error fetching accidents:", error);
    return NextResponse.json({ error: "Failed to fetch accidents" }, { status: 500 });
  }
}
