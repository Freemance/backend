/*
  Warnings:

  - You are about to drop the column `created_by` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_extension` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_height` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_name` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `Multimedia` table. All the data in the column will be lost.
  - The `screenshts` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProfileSkill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[filename]` on the table `Multimedia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('PENDING', 'REVIEWING', 'NEEDFIX', 'APPROVED', 'DISAPPROVED');

-- DropForeignKey
ALTER TABLE "ProfileSkill" DROP CONSTRAINT "ProfileSkill_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileSkill" DROP CONSTRAINT "ProfileSkill_skillId_fkey";

-- AlterTable
ALTER TABLE "Multimedia" DROP COLUMN "created_by",
DROP COLUMN "file_extension",
DROP COLUMN "file_height",
DROP COLUMN "file_name",
DROP COLUMN "file_path",
DROP COLUMN "file_size",
DROP COLUMN "file_type",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "extension" TEXT,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "screenshts",
ADD COLUMN     "screenshts" TEXT[];

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "profileStatus" "ProfileStatus" NOT NULL DEFAULT E'PENDING',
ALTER COLUMN "avatar" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "behance" TEXT,
ADD COLUMN     "dribbble" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "googlePlus" TEXT,
ADD COLUMN     "slack" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "state",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfileSkill";

-- CreateTable
CREATE TABLE "_ProfileToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToSkill_AB_unique" ON "_ProfileToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToSkill_B_index" ON "_ProfileToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Multimedia.filename_unique" ON "Multimedia"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "_ProfileToSkill" ADD FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToSkill" ADD FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
