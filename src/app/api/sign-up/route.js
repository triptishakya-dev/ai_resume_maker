import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export async function POST(req) {
  try {
    console.log("Incoming request to /api/sign-up");
    const body = await req.json();
    console.log("Request body received:", body);

    const { name, email, password } = body;
    console.log("Parsed data:", {
      name,
      email,
      password: password,
    });

    if (!name || !email || !password) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if user already exists
    console.log("Checking if user already exists...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // create user
    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log("User created:", { id: user.id, email: user.email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
