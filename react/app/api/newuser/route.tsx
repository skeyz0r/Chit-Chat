import { NextResponse } from "next/server";
import db from "@/app/components/prisma";
import { hash } from 'bcrypt'

function generateString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



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
            return NextResponse.json({email:null, message:"User with such email already exists!"}, {status:409})
        }
    

    const existingUserbyUser =  await db.user.findUnique({
        where:{username:username}
    })

    if(existingUserbyUser)
    {
        return NextResponse.json({user:null, message:"User with such name already exists!"}, {status:409})
    }

    const hashedPassword = await hash(password,10)


    const newUser = await db.user.create({
        data:{
            email,
            username,
            password:hashedPassword,
        }
    })



    return NextResponse.json({user: newUser, message:"User create"}, {status: 201})

}



    catch(error){
        
    }
}