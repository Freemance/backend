/*
  Warnings:

  - You are about to drop the column `starDate` on the `Course` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "starDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
