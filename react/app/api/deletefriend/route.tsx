import { NextResponse } from "next/server";
import db from "@/app/components/prisma";


export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {user, name} = body;

        const users = await db.user.findMany({
            where:{
                OR:[{username:user}, {username:name}]
            },
            select:{
                id:true
            }
        })

        const userf = await db.user.findMany({
            where:{
                OR:[
                    {username: name}, {username:user}
                ]
            },
            select:{
                friends:true
            }
        })

        const Userlist = userf[1].friends.filter((item:any) => item !== users[0].id)
        const friendlist = userf[0].friends.filter((item:any) => item !== users[1].id)

        await db.user.update({
            where: {
                username:name
            },
            data:{
                friends:Userlist
            }
        })

        await db.user.update({
            where: {
                username:user
            },
            data:{
                friends:friendlist
            }
        })


            return NextResponse.json({message:"Friend removed!"}, {status:202})
          

    }
catch(error)
{
    console.log(error)
}
}