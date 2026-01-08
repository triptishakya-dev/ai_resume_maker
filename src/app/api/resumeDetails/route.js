import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prepareInstructions, AIResponseFormat } from "@/constants";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const CompanyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-discription");
    const resume = formData.get("file");

    if (!CompanyName || !jobTitle || !jobDescription || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const buffer = await resume.arrayBuffer();
    const headers = {
      "Content-Type": "application/pdf",
    };

    const prompt = prepareInstructions({
      jobTitle,
      jobDescription,
      AIResponseFormat,
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(buffer).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse, { status: 200 });

  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
