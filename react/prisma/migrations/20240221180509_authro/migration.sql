-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_author_name_fkey";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "author_name" DROP DEFAULT;
