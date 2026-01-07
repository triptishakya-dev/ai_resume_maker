import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    console.log(formData)
    const CompanyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-discription");
    const resume = formData.get("file");

    console.log(CompanyName, jobTitle, jobDescription, resume);


    if (!CompanyName || !jobTitle || !jobDescription || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: "success" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
