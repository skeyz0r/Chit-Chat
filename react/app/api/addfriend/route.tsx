import { NextResponse } from "next/server";
import db from "@/app/components/prisma";

export  async function POST(req:Request)
{
    try{
        const body = await req.json()
        const {id,username} = body;

        const meCheck = await db.user.findUnique({
            where:{id: id, username: username}
        })

   if(meCheck === null)
   {
        const friendCheck = await db.user.findMany({
            where: {username:username, friends:{hasEvery:[id]}}
        })


        if(friendCheck.length === 0)
        {
        const newFriend = await db.user.update({
            where:{username:username},
            data:{
                friends:{push: id}
            },
            select:{
                id:true
            }
        })


        if(newFriend)
    {
        const data = await db.user.update({
            where:{id: id},
            data:{
                friends:{push: newFriend.id}
            },
        })


        return NextResponse.json({answer:false, message:`${username} is added to your friends list`}, {status:201})

    }

    else
    {
  
        return NextResponse.json({answer:true, message:`${username} is not found`}, {status:404})
 
    }
}
else
{
    return NextResponse.json({answer:true, message:`You and ${username} are already friends`}, {status:200})

}
   }
   else
   {
    return NextResponse.json({answer:true, message:`You are already your #1 friend`}, {status:200})

   }

}
    
catch(error)
{
    console.log(error)
}
}