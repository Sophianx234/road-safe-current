import { openai } from "@/lib/openai";
import * as dfd from "danfojs-node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const { question } = await req.json();
    const df = await dfd.readCSV("data.csv");
    const head = df.head(5).toJSON();
    const columns = df.columns;

    const prompt = `
You are a JavaScript data analyst using Danfo.js.
Here is the first 5 rows of the dataset: ${JSON.stringify(head)}
Columns: ${columns.join(", ")}
Question: ${question}

Reply with only valid JavaScript code using Danfo.js to answer the question.
Do not explain, just return code.
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const messageContent = aiResponse.choices[0]?.message?.content;
    if (!messageContent) {
      return NextResponse.json({ error: "AI response is empty." }, { status: 500 });
    }
    const codeToRun = messageContent.trim();
    let result;
    eval(`result = ${codeToRun}`);

    return NextResponse.json({ answer: result });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
