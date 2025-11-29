"use client";

import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const router = useRouter();

  const userId = userIdParam ? parseInt(userIdParam, 10) : null;
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [resendUsed, setResendUsed] = useState<boolean>(false); 

  useEffect(() => {
    if (!userId) return;
    async function sendOtp() {
      try {
        await axios.post("/api/otp", { userId });
        toast.success("OTP sent to your email!");
        setCanResend(false);
        setTimer(60);
      } catch {
        toast.error("Failed to send OTP");
      }
    }
    sendOtp();
  }, [userId]);

  useEffect(() => {
    if (!resendUsed && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !resendUsed) {
      setCanResend(true);
    }
  }, [timer, resendUsed]);

  if (!userId) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">
          Invalid verification link.
        </p>
      </div>
    );
  }

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await axios.post("/api/verify", { userId, otp });
      if (res.status === 200) {
        toast.success("Email verified successfully!");
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid OTP!");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  const handleResend = async () => {
    if (!userId || resendUsed) return;
    try {
      await axios.post("/api/otp", { userId });
      toast.success("OTP resent successfully!");
      setResendUsed(true); // ✅ user has used the resend once
      setCanResend(false);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-semibold text-center">Verify Your Email</h2>
        <p className="text-gray-500 text-sm text-center">
          Enter the 6-digit code sent to your email.
        </p>

        <InputOTP maxLength={6} onChange={(e) => setOtp(e)}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          onClick={handleVerify}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Verify
        </Button>

        <div className="flex justify-center items-center mt-2">
          {!resendUsed && !canResend && (
            <p className="text-gray-400 text-sm">
              Resend available in {timer}s
            </p>
          )}

          
          {!resendUsed && canResend && (
            <button
              onClick={handleResend}
              className="text-blue-500 text-sm underline opacity-90 hover:opacity-100 transition-all"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
