import { NextResponse } from "next/server";
import db from "@/app/components/prisma";
import { pusherServer } from "@/app/components/pusher";

export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {text, chatId, sender} = body;

      await db.message.create({
            data:{  
                text: text,
                chat_id: chatId,
                sender: sender
            }
        })

        

        await pusherServer.trigger(String(chatId),'newMessage', text)

        return NextResponse.json({answer:chatId, message:"Message sent!"}, {status:200})


    }
catch(error)
{
    console.log(error)
}
}