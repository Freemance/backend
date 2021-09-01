/*
  Warnings:

  - Made the column `course` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `starDate` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language` on table `Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT,
ALTER COLUMN "course" SET NOT NULL,
ALTER COLUMN "institution" SET NOT NULL,
ALTER COLUMN "starDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "inProgress" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "language" SET NOT NULL;
