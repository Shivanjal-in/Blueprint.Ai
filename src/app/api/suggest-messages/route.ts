// import { openai } from "@ai-sdk/openai";
import { streamText, OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Allow streaming responses up to 30 seconds
// export const maxDuration = 50;
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // const prompt = "";
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: "Say this is a test" }],
      max_tokens: 1000,
      stream: true,
    });
    for await (const chunk of response) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          headers,
          message,
        },
        {
          status,
        }
      );
    } else {
      console.log("An unexpected error occurred s", error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
