import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/options";
import { prisma } from "@/lib/prisma";
import { mentorFormSchema } from "@/lib/profile-actions-schema";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = mentorFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const mentor = await prisma.mentor.upsert({
      where: { userId: session.user.id },
      update: {
        isPaid: parsed.data.isPaid,
        domain: parsed.data.domain,
      },
      create: {
        userId: session.user.id,
        isPaid: parsed.data.isPaid,
        domain: parsed.data.domain,
      },
    });

    return NextResponse.json(mentor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save mentor profile" },
      { status: 500 }
    );
  }
}
