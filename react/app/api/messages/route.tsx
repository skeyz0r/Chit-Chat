import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;

        const chat = await db.message.findMany({
            where: {
                chat_id: id
            },
            select: {
                text: true,
                date: true,
                sender: true,
                user_list:true
            }
        });


            return NextResponse.json({answer:chat, message:"Message found!"}, {status:202})
            }

    
catch(error)
{
    console.log(error)
}
}