import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;

        const chat = await db.message.findMany({
            where: {
                chat_id: Number(id)
            },
            select: {
                id:true,
                text: true,
                date: true,
                sender: true,
                author: true,
                viewed:true
            }
        });
        
        if(chat.length > 0)
        {
            return NextResponse.json({answer:chat, message:"Message found!"}, {status:202})
        }
        return NextResponse.json({answer:chat, message:"No Message found!"}, {status:404})

            }

    
catch(error)
{
    console.log(error)
}
}