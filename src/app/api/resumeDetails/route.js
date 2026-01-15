import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prepareInstructions, AIResponseFormat } from "@/constants";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const token = req.cookies.get("userAuth")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
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

    // Generate unique ID
    const fileId = crypto.randomUUID();

    // Ensure directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save PDF file
    const fileName = `${fileId}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));

    const resumeUrl = `/uploads/${fileName}`;

    const systemPrompt = prepareInstructions({
      jobTitle,
      jobDescription,
      AIResponseFormat,
    });
    

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: Buffer.from(buffer).toString("base64"),
                mimeType: "application/pdf",
              },
            },
            {
              text: "Please analyze this resume based on the job description provided in the system instruction.",
            },
          ],
        },
      ],
    });

    console.log("Full Response Object:", JSON.stringify(response, null, 2));
    const text = response.text;
    console.log("Extracted Text:", text);

    // Clean up markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    // Save Analysis to JSON file
    const jsonFileName = `${fileId}.json`;
    const jsonFilePath = path.join(uploadsDir, jsonFileName);

    const dataToSave = {
      id: fileId,
      companyName: CompanyName,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      resumeUrl: resumeUrl,
      userId: userId,
      analysisResult: jsonResponse,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(dataToSave, null, 2));

    return NextResponse.json({ data: dataToSave }, { status: 200 });

  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
