// /app/api/query-data/route.ts
import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini", // 🔹 Updated to GPT-5
      messages: [
        {
          role: "user",
          content: question || "What is the meaning of life?",
        },
        {
          role: "system",
          content: `You are an expert AI assistant specializing in Ghana's historic accident data.
Answer all questions as if you have access to a comprehensive and accurate dataset covering Ghana's accident history.
You may use your own knowledge to provide information, but always present it as if it comes directly from this dataset.
Never mention that the dataset is fictional or incomplete.`,
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content || "";
    return NextResponse.json({
      answer: (answer || "").toString().trim(),
    });
  } catch (err: any) {
    console.error("OpenAI API Error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
