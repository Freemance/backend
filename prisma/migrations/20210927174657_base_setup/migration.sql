-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Multimedia.filename_unique" RENAME TO "Multimedia_filename_key";

-- RenameIndex
ALTER INDEX "PasswordResets.email_unique" RENAME TO "PasswordResets_email_key";

-- RenameIndex
ALTER INDEX "Skill.name_unique" RENAME TO "Skill_name_key";

-- RenameIndex
ALTER INDEX "Tag.name_unique" RENAME TO "Tag_name_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.username_unique" RENAME TO "User_username_key";
