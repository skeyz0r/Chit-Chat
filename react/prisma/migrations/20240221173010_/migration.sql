/*
  Warnings:

  - You are about to drop the column `user_list` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "user_list",
ADD COLUMN     "viewed" INTEGER[];
