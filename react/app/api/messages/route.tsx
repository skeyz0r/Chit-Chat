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
            user: {
                select: {
                    // Add the fields you want to select from the user table
                    userId: true,
                    username: true,
                    // Include other fields as needed
                }
            }
        }
          })


            return NextResponse.json({answer:chat, message:"Message found!"}, {status:202})
            }

    
catch(error)
{
    console.log(error)
}
}