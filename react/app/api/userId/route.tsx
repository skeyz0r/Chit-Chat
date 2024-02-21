import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export  async function GET()
{
    try{

        const id = cookies().get('id')?.value
        return NextResponse.json({answer:Number(id),  message:"Id found"}, {status:200})
}
catch(error)
{
    console.log(error)
}
}