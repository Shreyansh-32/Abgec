import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = Math.max(1, Number(pageParam ?? 1));
    let limit = Math.max(1, Number(limitParam ?? 6));
    if (!Number.isFinite(limit) || Number.isNaN(limit)) limit = 6;
    if (limit > 100) limit = 100;

    const where = {
      user: {
        verified: true,
        isEmailVerified: true,
      },
    } as const;

    const total = await prisma.mentor.count({ where });

    const mentors = await prisma.mentor.findMany({
      where,
      orderBy: { id: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        domain: true,
        isPaid: true,
        user: {
          select: {
            id: true,
            fullName: true,
            gradYear: true,
            branch: true,
            designation: true,
            organisation: true,
            location: true,
            profilePicture: true,
          },
        },
      },
    });

    return NextResponse.json({ data: mentors, total, page, limit });
  } catch (error) {
    console.error("GET /api/mentors error:", error);
    return NextResponse.json(
      { message: "Failed to load mentors" },
      { status: 500 }
    );
  }
}
