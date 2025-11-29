// app/api/alumni/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination params
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = Math.max(1, Number(pageParam ?? 1));
    let limit = Math.max(1, Number(limitParam ?? 10));
    if (!Number.isFinite(limit) || Number.isNaN(limit)) limit = 10;
    // safety cap
    if (limit > 100) limit = 100;

    const yearParam = searchParams.get("year");
    const departmentParam = searchParams.get("department");
    const search = searchParams.get("search");

    // Use Prisma's typed where input
    const where: Prisma.UserWhereInput = {
      verified: true,
      isEmailVerified: true,
    };

    // year filter
    if (yearParam) {
      const parsed = parseInt(yearParam, 10);
      if (!Number.isNaN(parsed)) {
        where.gradYear = parsed;
      }
    }

    // department filter (treat "all" / empty as no filter)
    if (departmentParam && departmentParam !== "all" && departmentParam !== "") {
      where.branch = departmentParam;
    }

    // search filter across multiple fields
    if (search && search.trim() !== "") {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { organisation: { contains: search, mode: "insensitive" } },
        { designation: { contains: search, mode: "insensitive" } },
      ];
    }

    // get total matching rows
    const total = await prisma.user.count({ where });

    // fetch current page (only safe fields)
    const users = await prisma.user.findMany({
      where,
      orderBy: { gradYear: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fullName: true,
        gradYear: true,
        branch: true,
        email: true,
        mobile: true,
        organisation: true,
        designation: true,
        location: true,
        profilePicture: true,
      },
    });

    return NextResponse.json(
      { data: users, total, page, limit },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/alumni error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
