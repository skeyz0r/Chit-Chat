import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;


        const chat = await db.chat.findMany({
            where:{
               user_list:{has:id}},
            select:{
              id:true,
              name: true,        
            }
          })
          if(chat.length > 0)
          {
            return NextResponse.json({answer:chat, message:"Chat loaded!"}, {status:202})
          }
          else
          {
            return NextResponse.json({message:"No chat found"}, {status:404})
          }
            }

    
catch(error)
{
    console.log(error)
}
}