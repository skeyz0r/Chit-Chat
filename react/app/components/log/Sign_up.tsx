'use client'
import { useState } from "react"
import { signIn } from "next-auth/react";


export default function SignUp()
{
    const [showPsw,setShowPsw] = useState(false)
    const [username, setUsername] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState({value:'', state:'hidden'})


    async function submit(e:React.MouseEvent<HTMLButtonElement>)
{
    e.preventDefault()
    try{
       const user = await fetch('/api/register', { method: 'POST', body: JSON.stringify({username, email, password}) })
            if(user.ok)
            {
                const SignInData = await signIn('credentials',{
                    username:username,
                    password:password,
                    redirect:false,
                });
                if(!SignInData?.ok)
                {
                 setError({value:'User with such email or username already exists', state: 'opacity-1'})
                 }
                 else
                 {
                    signIn('',{
                callbackUrl: `${window.location.origin}/sign-in`
                 })
        }
            }
    }
    catch(error)
    {
        console.log(error)
    }
}        

    return(
        <main className="h-screen flex justify-center items-center w-100">
          <form className="flex flex-col gap-3 p-3 rounded-md shadow-md border ">
          <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input  value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}} name="username" type="text"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input  value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}} name="email" type="text"/>
                </div>
                <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} name="passowrd" type={`${showPsw ? 'text' : 'password'}`}/>
                </div>
                <div onClick={()=>{setShowPsw(!showPsw)}} className="flex items-center gap-2">
                    <input checked={showPsw} readOnly type="checkbox"/>
                    <label>Show password</label>
                </div>
                <button onClick={(e)=>{submit(e)}} className="px-3 py-2 rounded-lg shadow-2xl border">Sing up</button>
          </form>
        </main>
    )
}