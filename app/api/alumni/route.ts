import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
    let limit = Math.max(1, parseInt(limitParam || "10", 10) || 10);
    // safety cap
    if (limit > 100) limit = 100;

    const yearParam = searchParams.get("year");
    const departmentParam = searchParams.get("department");
    const search = searchParams.get("search");

    const where: any = {
      verified: true,
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
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { organisation: { contains: search, mode: "insensitive" } },
        { designation: { contains: search, mode: "insensitive" } },
      ];
    }

    // count total matching rows
    const total = await prisma.user.count({ where });

    // fetch page
    const users = await prisma.user.findMany({
      where,
      orderBy: { gradYear: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      // only return safe fields
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

    return NextResponse.json({ data: users, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/alumni error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
