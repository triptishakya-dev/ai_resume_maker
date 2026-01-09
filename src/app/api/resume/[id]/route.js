import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
    try {
        const token = req.cookies.get("userAuth")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { id } = await params;

        // Read from JSON file
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        const jsonFilePath = path.join(uploadsDir, `${id}.json`);

        if (!fs.existsSync(jsonFilePath)) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
        const resume = JSON.parse(fileContent);

        return NextResponse.json(resume, { status: 200 });
    } catch (error) {
        console.error("Error fetching resume:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
