/*
  Warnings:

  - A unique constraint covering the columns `[bmkgId]` on the table `Earthquake` will be added. If there are existing duplicate values, this will fail.
  - Made the column `bmkgId` on table `Earthquake` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Earthquake" ADD COLUMN     "felt" TEXT,
ADD COLUMN     "shakemap" TEXT,
ADD COLUMN     "shakemapUrl" TEXT,
ALTER COLUMN "bmkgId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "riskResultId" INTEGER,
ADD COLUMN     "sentAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Earthquake_bmkgId_key" ON "Earthquake"("bmkgId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_riskResultId_fkey" FOREIGN KEY ("riskResultId") REFERENCES "RiskResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
