/*
  Warnings:

  - The `salaryMax` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salaryMin` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salaryMax",
ADD COLUMN     "salaryMax" INTEGER,
DROP COLUMN "salaryMin",
ADD COLUMN     "salaryMin" INTEGER;
