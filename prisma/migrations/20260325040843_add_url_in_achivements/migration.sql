-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Otp_userId_createdAt_idx" ON "Otp"("userId", "createdAt");
