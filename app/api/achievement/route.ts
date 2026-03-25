import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/options";
import { prisma } from "@/lib/prisma";
import { achievementFormSchema } from "@/lib/profile-actions-schema";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = achievementFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const achievement = await prisma.achievement.create({
      data: {
        userId: session.user.id,
        Achievement: parsed.data.achievement,
        attachmentUrl: parsed.data.attachmentUrl ?? null,
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to share achievement" },
      { status: 500 }
    );
  }
}
