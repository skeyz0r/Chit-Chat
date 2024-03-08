import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;

         await db.chat.delete({
            where: {
              id: Number(id)        
            }
          })
   
            return NextResponse.json({message:"Chat removed!"}, {status:202})
          

    }
catch(error)
{
    console.log(error)
}
}