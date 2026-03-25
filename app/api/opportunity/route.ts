import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/options";
import { prisma } from "@/lib/prisma";
import { opportunityFormSchema } from "@/lib/profile-actions-schema";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = opportunityFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        userId: session.user.id,
        JobTitle: parsed.data.jobTitle,
        Location: parsed.data.location ?? null,
        RemotePosition: parsed.data.remotePosition,
        JobType: parsed.data.jobType,
        Description: parsed.data.description,
        ApplicationUrl: parsed.data.applicationUrl ?? null,
        CompanyName: parsed.data.companyName,
        Website: parsed.data.website ?? null,
        attachmentUrl: parsed.data.attachmentUrl ?? null,
      },
    });

    return NextResponse.json(opportunity);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to share opportunity" },
      { status: 500 }
    );
  }
}
