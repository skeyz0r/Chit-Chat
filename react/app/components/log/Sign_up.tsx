'use client'
import { useState } from "react"

export default function SignUp()
{

    const [showPsw,setShowPsw] = useState(false)

    return(
        <main className="h-screen flex justify-center items-center w-100">
          <form className="flex flex-col gap-3 p-3 rounded-md shadow-md border ">
          <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text"/>
                </div>
                <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                    <input name="passowrd" type={`${showPsw ? 'text' : 'password'}`}/>
                </div>
                <div onClick={()=>{setShowPsw(!showPsw)}} className="flex items-center gap-2">
                    <input checked={showPsw} readOnly type="checkbox"/>
                    <label>Show password</label>
                </div>
                <button className="px-3 py-2 rounded-lg shadow-2xl border">Sing up</button>
          </form>
        </main>
    )
}