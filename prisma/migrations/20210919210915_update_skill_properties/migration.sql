/*
  Warnings:

  - The `icon` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "icon",
ADD COLUMN     "icon" TEXT[];
