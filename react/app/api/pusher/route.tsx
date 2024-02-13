

import { NextResponse } from "next/server";


export  async function GET()
{
    try{
  return NextResponse.json({answer:process.env.PUSHER_KEY, message:"Chat created!"}, {status:200})

}
catch(error)
{
    console.log(error)
}
}