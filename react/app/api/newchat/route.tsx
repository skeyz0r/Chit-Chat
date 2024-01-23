import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{


    try{
        const body = await req.json()
        const {chatVal} = body;
        const {authorId, name, contacts} = chatVal;


        const existingChat =  await db.chat.findMany({
            where:{name:name, authorId:authorId}
        })
        

        if(existingChat.length > 0)
        {
            return NextResponse.json({answer:null, message:"Chat with such name already exists!"}, {status:409})
        }
        else
        {
            if(contacts.length === 0)
            {
                await db.chat.create({
                    data:{
                        authorId:authorId,
                        name:name,
                    }}
                )
            }
            else
            {
            await db.chat.create({
                data:{
                    authorId:authorId,
                    name:name,
                    user_list:contacts
                }
            })
        
    }
    return NextResponse.json({answer:name, message:"Chat created!"}, {status:200})
    }

    }
catch(error)
{
    console.log(error)
}
}