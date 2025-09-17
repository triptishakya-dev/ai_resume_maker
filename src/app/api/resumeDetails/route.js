import { startTurbopackTraceServer } from "next/dist/build/swc/generated-native";
import { NextRequest } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const CompanyName = FormData.get("CompanyName");
    const jobTitle = FormData.get("jobTitle");
    const jobDescription = FormData.get("jobDescription");
    const resume = formData.get("resume");

    if (!CompanyName || !jobTitle || !jobDescription || !resume) {
      return NextRequest.json(
        { error: "internal server error" },
        { status: 500 }
      );
    }


  } catch (error) {
    console.log(error);
    return NextRequest.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
