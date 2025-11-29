import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
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

  try {
    // FIX: location was missing here!
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
      location, // Added location to validation check
      proofPicture, 
    });

    if (res.success) {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        return NextResponse.json(
          { message: "User with given email already exist" },
          { status: 400 }
        );
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          gradYear,
          mobile,
          branch,
          designation,
          organisation,
          role: "alumni",
          proofPicture,
          location // Saving location to DB
        },
      });

      return NextResponse.json(
        { message: "User signed up successfully" },
        { status: 200 }
      );
    } else {
      // Return specific error details to help debugging
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