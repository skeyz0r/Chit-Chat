import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{


    try{
        const body = await req.json()
        const {chatVal, select} = body;
        const {author, name} = chatVal;
        let list:number[] = [author]

        
        const existingChat =  await db.chat.findMany({
            where:{name:name, authorId:author}
        })
        

        if(existingChat.length > 0)
        {
            return NextResponse.json({answer:null, message:"Chat with such name already exists!"}, {status:409})
        }
        else
        {
            if(select.length === 0)
            {
                return NextResponse.json({message:"Select user"}, {status:500})
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

                let chat;
                 chat = await db.chat.create({
                    data:{
                        authorId:author,
                        name:name,
                        user_list: list
                    },
                    select:{
                        id:true,
                        name:true
                    }
                })

            return NextResponse.json({chat, message:"Chat created!"}, {status:200})
        
    }}
    }
catch(error)
{
    console.log(error)
}
}