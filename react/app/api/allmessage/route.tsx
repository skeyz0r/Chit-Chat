import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {chatId} = body;

        const data = await db.message.findMany({
            where:{chat_id:chatId},
            select:{
                text: true,
                date:true,
                sender:true
            }
        })


        return NextResponse.json({answer:data, message:"Chat loaded!"}, {status:200})


    }
catch(error)
{
    console.log(error)
}
}