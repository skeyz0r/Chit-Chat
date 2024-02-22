import db from "@/app/components/prisma";
import { pusherServer } from "@/app/components/pusher";
import { NextResponse } from "next/server";

export  async function POST(req:Request)
{
    try {
        const body = await req.json();
        const { username, id } = body;
    
       await db.message.updateMany({
        where: {
            chat_id: id,
            NOT: {
                OR:[
                {viewed: { has: username }}, // Check if 'viewed' array includes 'username'
                {viewed: undefined}
                ]
            }
        },
        data: {
            viewed: {
                push: username // Add 'username' to the 'viewed' array
            }
        }
        });

        await pusherServer.trigger(String(id),'view', {username})


        return NextResponse.json({message:"Chat viewed!"}, {status:202})


        // Further processing with the 'seen' array if needed
    }

    
catch(error)
{
    console.log(error)
}
}