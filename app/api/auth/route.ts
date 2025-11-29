import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      fullName,
      gradYear,
      branch,
      email,
      password,
      mobile,
      organisation,
      designation,
      proofPicture,
      location
    } = data;

    // 1. Validate inputs using Zod
    // Note: 'mobile' is now passed as a string (e.g., "9876543210")
    // 'location' is now required
    const res = await userSchema.safeParse({
      fullName,
      gradYear,
      branch,
      email,
      password,
      mobile, 
      organisation,
      designation,
      role: "alumni",
      location,
      proofPicture, 
    });

    if (res.success) {
      // 2. Check if user exists
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "User with given email already exists" },
          { status: 400 }
        );
      }
      
      // 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 4. Create user
      // Ensure your prisma.schema has 'mobile' set to String type!
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          gradYear,
          mobile, // Saving as String to prevent Int overflow
          branch,
          designation,
          organisation,
          role: "alumni",
          proofPicture,
          location
        },
      });

      return NextResponse.json(
        { message: "User signed up successfully" },
        { status: 200 }
      );
    } else {
      // Return validation errors
      return NextResponse.json(
        { message: "Invalid input format", errors: res.error.flatten() },
        { status: 411 }
      );
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}