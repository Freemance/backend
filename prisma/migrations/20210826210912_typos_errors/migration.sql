/*
  Warnings:

  - You are about to drop the column `starDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `firstMame` on the `User` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "starDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstMame",
ADD COLUMN     "firstName" TEXT NOT NULL;
