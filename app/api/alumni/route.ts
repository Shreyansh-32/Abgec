import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    let department = searchParams.get("department");
    const search = searchParams.get("search");
    if(department === "all"){
      department = ""
    }
    const res = await prisma.user.findMany({
      where: {
        verified: true,
        ...(year ? { gradYear: parseInt(year) } : {}),
        ...(department ? { branch : department } : {}),
        ...(search
          ? {
              OR: [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { organisation: { contains: search, mode: "insensitive" } },
                { designation: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { gradYear: "desc" },
    });

    return NextResponse.json(
      { message: "Data fetched successfully", data: res },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}