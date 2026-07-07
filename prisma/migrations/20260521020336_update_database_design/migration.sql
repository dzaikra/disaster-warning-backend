/*
  Warnings:

  - You are about to drop the column `risk` on the `Earthquake` table. All the data in the column will be lost.
  - Added the required column `earthquakeTime` to the `Earthquake` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Earthquake" DROP COLUMN "risk",
ADD COLUMN     "bmkgId" TEXT,
ADD COLUMN     "earthquakeTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "potential" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fcmToken" TEXT;

-- CreateTable
CREATE TABLE "RiskResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "earthquakeId" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "fuzzyDistance" DOUBLE PRECISION NOT NULL,
    "fuzzyMagnitude" DOUBLE PRECISION NOT NULL,
    "fuzzyDepth" DOUBLE PRECISION NOT NULL,
    "sawScore" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RiskResult" ADD CONSTRAINT "RiskResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskResult" ADD CONSTRAINT "RiskResult_earthquakeId_fkey" FOREIGN KEY ("earthquakeId") REFERENCES "Earthquake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
