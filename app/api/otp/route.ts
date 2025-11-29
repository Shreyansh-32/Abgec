import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thakurshreyansh0609@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const otp = randomInt(100000, 1000000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const user = await prisma.user.findFirst({
        where:{
            id : userId
        }
    });
    if(!user){
        return NextResponse.json({"message" : "Register in order to receive otp"} , {status : 401});
    }
    
    await prisma.otp.deleteMany({
        where:{
            userId
        }
    })
    await prisma.otp.create({
      data: {
        otp: hashedOtp,
        expires: new Date(Date.now() + 10 * 60 * 1000),
        userId,
      },
    });
    
    const info = await transporter.sendMail({
      from: '"Shreyansh Thakur" <thakurshreyansh0609@gmail.com>',
      to: `${user.email}`,
      subject: "Otp",
      text: `Your otp is : ${otp}`, // plain‑text body
      html: `<br/>Your otp is : ${otp}`, // HTML body
    });
    return NextResponse.json(
      { message: "Otp sent to your mail successfully" , info},
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
