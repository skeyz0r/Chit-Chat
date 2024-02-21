/*
  Warnings:

  - You are about to drop the column `author_name` on the `message` table. All the data in the column will be lost.
  - Added the required column `author` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "author_name",
ADD COLUMN     "author" TEXT NOT NULL;
