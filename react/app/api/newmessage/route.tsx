import { NextResponse } from "next/server";
import db from "@/app/components/prisma";
import { pusherServer } from "@/app/components/pusher";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {text, chatId, sender} = body;


    const username = await db.user.findFirst({
        where:{
            id:sender
        },
        select:{
            username:true
        }
    })

    await db.message.create({
        data: {
            text: text,
            chat_id: chatId,
            sender: sender,
            author: String(username?.username)     
        }
    });


   const usr =  username?.username

        await pusherServer.trigger(String(chatId),'newMessage', {text, usr})

        return NextResponse.json({answer:sender, message:"Message sent!"}, {status:200})


    }
catch(error)
{
    console.log(error)
}
}