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
          location
        },
      });

      return NextResponse.json(
        { message: "User signed up successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid input format", res },
        { status: 411 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
