import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

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

        return NextResponse.json({answer:chatId, message:"Chat created!"}, {status:200})


    }
catch(error)
{
    console.log(error)
}
}