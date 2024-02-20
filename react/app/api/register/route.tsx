import { NextResponse } from "next/server";
import db from "@/app/components/prisma";
import { hash } from 'bcrypt'


export  async function POST(req:Request)
{


    try{
        const body = await req.json()
        const {email, username, password} = body;

        const existingUserbyEmail =  await db.user.findUnique({
            where:{email:email}
        })

        if(existingUserbyEmail)
        {
            return NextResponse.json({message:"User with such email already exists!"}, {status:402})
        }
    

    const existingUserbyUser =  await db.user.findUnique({
        where:{username:username}
    })

    if(existingUserbyUser)
    {
        return NextResponse.json({message:"User with such name already exists!"}, {status:402})
    }

    const hashedPassword = await hash(password,10)


    const newUser = await db.user.create({
        data:{
            email,
            username,
            password:hashedPassword,
        }
    })



    return NextResponse.json({user: newUser, message:"User created"}, {status: 200})

}



    catch(error){
        console.log(error)
    }
}