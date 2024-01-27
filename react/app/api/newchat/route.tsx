import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{


    try{
        const body = await req.json()
        const {chatVal, select} = body;
        const {authorId, name} = chatVal;
        let list:number[] = []

        const existingChat =  await db.chat.findMany({
            where:{name:name, authorId:authorId}
        })
        

        if(existingChat.length > 0)
        {
            return NextResponse.json({answer:null, message:"Chat with such name already exists!"}, {status:409})
        }
        else
        {
            if(select.length === 0)
            {
                await db.chat.create({
                    data:{
                        authorId:authorId,
                        name:name,
                    }}
                )
                return NextResponse.json({answer:'Chat created', message:""}, {status:200})
            }
            else
            {
                for(let i = 0; i<select.length; i++)
                {
                    const data = await db.user.findUnique({
                        where:{username:select[i]},
                        select:{id:true}
                    })
                    list.push(Number(data?.id))
                }

                await db.chat.create({
                        data:{
                            authorId:authorId,
                            name:name,
                            user_list: list
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