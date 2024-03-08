-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_authorId_fkey";

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
