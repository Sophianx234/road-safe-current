// /app/api/query-data/route.ts
import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // 🔹 Updated to GPT-5
      messages: [
        {
          role: "user",
          content: question || "What is the meaning of life?",
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ answer }, { status: 200 });
  } catch (err: any) {
    console.error("OpenAI API Error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
