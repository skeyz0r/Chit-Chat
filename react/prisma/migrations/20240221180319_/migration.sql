-- AlterTable
ALTER TABLE "message" ADD COLUMN     "author_name" TEXT NOT NULL DEFAULT 'null';

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
