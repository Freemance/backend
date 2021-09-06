/*
  Warnings:

  - The values [CONTRACTOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'MANAGER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "screenshts" INTEGER;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar" INTEGER,
ADD COLUMN     "multimediaId" INTEGER;

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "file_name" TEXT,
    "file_path" TEXT,
    "file_size" TEXT,
    "file_type" TEXT,
    "file_extension" TEXT,
    "file_height" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);
