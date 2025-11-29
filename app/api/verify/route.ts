import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { otp, userId } = await req.json();

  try {
    const otpData = await prisma.otp.findFirst({
        where:{
            userId
        }
    });
    if(!otpData){
        return NextResponse.json({"message" : "OTP for this user doesn't exist"} , {status : 401});
    }
    if(otpData?.expires < new Date(Date.now())){
        return NextResponse.json({"message" : "OTP expired"} , {status : 401});
    }
    const compare = await bcrypt.compare(otp , otpData.otp);
    if(!compare){
        return NextResponse.json({"message" : "Wrong OTP"} , {status : 401});
    }
    await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            isEmailVerified : true
        }
    });
    await prisma.otp.deleteMany({
      where:{
        userId
      }
    })
    return NextResponse.json({"message" : "Email verified successfully"} , {status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
