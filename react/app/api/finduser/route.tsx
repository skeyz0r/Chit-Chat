import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {usr} = body;

        const users = await db.user.findMany({
          take:4,
            where: {
              username: {
                startsWith: usr,
              },
              
            },
            select:{
                username: true
            }
          })
          
          if(users.length !== 0)
          {
        return NextResponse.json({answer:users, message:"Users found!"}, {status:200})
          }
          else
          {
            return NextResponse.json({answer:[{username:'0 results'}], message:"No users!"}, {status:209})
          }

    }
catch(error)
{
    console.log(error)
}
}