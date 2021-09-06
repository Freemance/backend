/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_profileId_unique" ON "SocialLink"("profileId");
