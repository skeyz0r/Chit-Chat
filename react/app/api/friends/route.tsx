import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id} = body;
        let friends = []

        const data = await db.user.findUnique({
            where:{id:id},
            select:{
               friends:true
            }
        })

      

        if(data?.friends)
        {
            if(data.friends.length > 0)
            {
                for(let i = 0; i < data?.friends.length;i++)
                {
                    const name = await db.user.findUnique({
                        where:{id:data.friends[i]},
                        select:{
                           username:true
                        }
                    })
        
                    friends.push(name?.username)
                }
                return NextResponse.json({answer:friends, message:"Friend list loaded!"}, {status:200})
                }

                return NextResponse.json({ message:"No friends found"}, {status:404})

        }
        return NextResponse.json({ message:"No friends found"}, {status:404})
    }
catch(error)
{
    console.log(error)
}
}