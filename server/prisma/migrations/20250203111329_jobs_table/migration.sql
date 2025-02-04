/*
  Warnings:

  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryRange` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `coverLetter` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `address` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployerProfile" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "description",
DROP COLUMN "salaryRange",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "salaryMax" TEXT,
ADD COLUMN     "salaryMin" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "coverLetter",
ADD COLUMN     "cv" TEXT;
