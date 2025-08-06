// app/api/accidents/fatal-by-vehicle/route.ts

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/connectDB"
import Accident from "@/models/AccidentSchema"

export async function GET() {
  await connectDB()

  try {
    const result = await Accident.aggregate([
      { $match: { severity: "fatal" } },
      {
        $group: {
          _id: {
            year: "$year",
            vehicleType: "$vehicleType",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ])

    // Format into chart data
    const chartMap: Record<number, any> = {}

    result.forEach(({ _id, count }) => {
      const { year, vehicleType } = _id
      if (!chartMap[year]) chartMap[year] = { year: year.toString() }
      chartMap[year][vehicleType] = count
    })

    return NextResponse.json({ data: Object.values(chartMap) })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
