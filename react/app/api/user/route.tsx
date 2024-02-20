import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {sender} = body;

        const user = await db.user.findFirst({
            where: {
                id: sender
            },
            select: {
             id:true
            }
        });

            return NextResponse.json({answer:user, message:"User found!"}, {status:202})
            }

    
catch(error)
{
    console.log(error)
}
}