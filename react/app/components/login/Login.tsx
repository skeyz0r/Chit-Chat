'use client'

import { signIn } from "next-auth/react"
import { useState } from "react";

export default function Login()
{

    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setEr] = useState({error: '', state:'hidden'})

   async function submit(e:React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()
        try{
            const SignInData = await signIn('credentials',{
                username:username,
                password:password,
                redirect:false,
            });
           if(!SignInData?.ok)
           {
            setEr({error:'Wrong username or password', state: 'visible'})
            }
            else
            {
               signIn('',{
                callbackUrl: `${window.location.origin}/sign-in`
            })
            }
        }catch(error)
        {
            console.log("Error", error)
        }
    }

    return(
        <main className="flex flex-col justify-center items-center min-h-screen">
            <p className={`${error.state}`}>{error.error}</p>
        <form className="flex flex-col">
            <div className="flex">
            <label>Username</label>
            <input type="text" value={username}  onChange={(e) => setUser(e.currentTarget.value)} name="username" placeholder="username"/>
            </div>
            <div className="flex">
            <label>Password</label>
            <input type="password" value={password}  onChange={(e) => setPassword(e.currentTarget.value)} name="password" placeholder="username"/>
            </div>
            <button onClick={(e)=>{submit(e)}}>Sign in</button>
        </form>
    </main>
)
    
}