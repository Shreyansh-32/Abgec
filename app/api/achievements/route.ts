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

    const total = await prisma.achievement.count({ where });

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: { id: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        Achievement: true,
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

    const data = achievements.map((item) => ({
      id: item.id,
      achievement: item.Achievement,
      user: item.user,
    }));

    return NextResponse.json({ data, total, page, limit });
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return NextResponse.json(
      { message: "Failed to load achievements" },
      { status: 500 }
    );
  }
}
