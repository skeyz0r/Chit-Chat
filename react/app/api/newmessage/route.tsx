import { NextResponse } from "next/server";
import db from "@/app/components/prisma";
import { pusherServer } from "@/app/components/pusher";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {text, chatId, sender} = body;


  const users = await db.chat.findMany({
    where: { id: chatId },
    select: {
        user_list: true
    }
});

    await db.message.create({
        data: {
            text: text,
            chat_id: chatId,
            sender: sender,
            user_list: users[0].user_list
        }
    });



        await pusherServer.trigger(String(chatId),'newMessage', {text, sender})

        return NextResponse.json({answer:sender, message:"Message sent!"}, {status:200})


    }
catch(error)
{
    console.log(error)
}
}