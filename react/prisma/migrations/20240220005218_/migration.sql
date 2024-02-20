/*
  Warnings:

  - The `user_list` column on the `message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "user_list",
ADD COLUMN     "user_list" INTEGER[];
