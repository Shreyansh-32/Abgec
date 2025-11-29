// app/api/otp/route.ts  (or wherever your route lives)
import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type ReqBody = {
  userId?: number;
  email?: string; // optionally allow sending by email
};

const BREVO_API = "https://api.brevo.com/v3/smtp/email";
const OTP_TTL_MINUTES = 10;

export async function POST(req: NextRequest) {
  const body: ReqBody = await req.json().catch(() => ({}));
  const userId = body.userId;
  const emailFromEnv = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME || "GEC Bilaspur Alumni";
  const BREVO_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_KEY) {
    console.error("Brevo API key missing (BREVO_API_KEY)");
    return NextResponse.json({ message: "Email provider not configured" }, { status: 500 });
  }

  if (!userId && !body.email) {
    return NextResponse.json({ message: "userId or email is required" }, { status: 400 });
  }

  try {
    // find user by id (preferred) or by email
    const user = userId
      ? await prisma.user.findUnique({ where: { id: userId } })
      : body.email
      ? await prisma.user.findFirst({ where: { email: body.email } })
      : null;

    if (!user) {
      return NextResponse.json({ message: "User not found. Please register first." }, { status: 404 });
    }

    // generate 6-digit OTP
    const otp = randomInt(100000, 1000000).toString();

    // hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // remove existing OTPs for this user (so only the newest is valid)
    await prisma.otp.deleteMany({ where: { userId: user.id } });

    // store new OTP
    await prisma.otp.create({
      data: {
        otp: hashedOtp,
        expires: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
        userId: user.id,
      },
    });

    // build email content (improved structure)
    const subject = "Your GEC Bilaspur verification code";
    const textContent = `Your verification code is ${otp}. It expires in ${OTP_TTL_MINUTES} minutes. If you didn't request this, ignore this mail.`;
    const htmlContent = `
      <div style="font-family: Helvetica, Arial, sans-serif; color:#111; line-height:1.4;">
        <div style="max-width:600px;margin:0 auto;padding:24px;">
          <div style="text-align:center;">
            <h2 style="margin:0 0 8px 0; font-size:20px; color:#0f172a;">GEC Bilaspur — Email Verification</h2>
            <p style="margin:0 0 16px 0; color:#374151;">Use the code below to verify your email. It will expire in ${OTP_TTL_MINUTES} minutes.</p>
          </div>

          <div style="display:flex;justify-content:center;margin:20px 0;">
            <div style="background:#f8fafc;border-radius:8px;padding:18px 26px;box-shadow:0 1px 3px rgba(2,6,23,0.06);">
              <p style="margin:0;text-align:center;font-size:28px;letter-spacing:3px;font-weight:700;color:#0b61d6;">${otp}</p>
            </div>
          </div>

          <p style="color:#475569;font-size:13px;margin-top:12px;">
            If you didn't request this code, you can safely ignore this email.
          </p>

          <hr style="border:none;border-top:1px solid #e6eef9;margin:20px 0;" />

          <p style="font-size:12px;color:#9ca3af;margin:0;">
            GEC Bilaspur Alumni Association<br/>
            ${emailFromEnv ? `${emailFromEnv}` : ""}
          </p>
        </div>
      </div>
    `;

    // prepare Brevo body
    const brevoBody = {
      sender: {
        name: fromName,
        email: emailFromEnv || "no-reply@yourdomain.com",
      },
      to: [{ email: user.email, name: user.fullName || undefined }],
      subject,
      htmlContent,
      textContent,
    };

    // call Brevo
    const resp = await fetch(BREVO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_KEY,
      },
      body: JSON.stringify(brevoBody),
    });

    const respBody = await resp.text().catch(() => "");

    if (!resp.ok) {
      console.error("Brevo error:", resp.status, respBody);
      return NextResponse.json(
        { message: "Failed to send OTP email", detail: respBody },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "OTP sent to your email" }, { status: 200 });
  } catch (err) {
    console.error("OTP route error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
