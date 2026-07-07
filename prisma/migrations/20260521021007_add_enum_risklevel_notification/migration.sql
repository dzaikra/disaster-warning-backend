/*
  Warnings:

  - Added the required column `status` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `riskLevel` on the `RiskResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('AMAN', 'WASPADA', 'SIAGA', 'BAHAYA');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('SENT', 'PENDING', 'FAILED');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "RiskResult" DROP COLUMN "riskLevel",
ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL;
