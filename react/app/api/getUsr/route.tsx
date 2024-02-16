import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;
     
        const user = await db.user.findFirst({
            where:{id:id},
            select:{username:true}
        })
        return NextResponse.json({answer:user, message:"User found!"}, {status:200})

        }
    catch(error)
    {
        console.log(error)
    }
    }