/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "portfolioId";

-- CreateTable
CREATE TABLE "_PortfolioToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioToSkill_AB_unique" ON "_PortfolioToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioToSkill_B_index" ON "_PortfolioToSkill"("B");

-- AddForeignKey
ALTER TABLE "_PortfolioToSkill" ADD FOREIGN KEY ("A") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToSkill" ADD FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
