// app/api/profile/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options"; // Make sure this path matches your project
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" , message : error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // 1. Destructure ONLY the allowed fields. 
    // This prevents users from injecting fields like "role": "ADMIN" or "verified": true
    const { organisation, designation, location, profilePicture } = body;

    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        // Use the specific fields. 
        // Using '?? null' ensures if frontend sends undefined, we save null (or keep it as is depending on logic, but usually null for clearing)
        organisation: organisation ?? null,
        designation: designation ?? null,
        location: location ?? null,
        profilePicture: profilePicture ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}