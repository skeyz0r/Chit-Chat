'use client'
import { useState } from "react"


export default function Register()
{

    const [email, setEmail] = useState('')
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')

   async function submit()
    {
        try{
         const newuser = await fetch('/api/newuser',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                body: JSON.stringify({email, username, password})
                
            })
              
        
        } catch(error){
            console.log(error)
        }
    }

    return(
        <main className="flex flex-col justify-center items-center min-h-screen">
            <form className="flex flex-col">
                <div className="flex">
                <label>Username</label>
                <input type="text" value={username}  onChange={(e) => setUser(e.currentTarget.value)} name="username" placeholder="username"/>
                </div>
                <div className="flex">
                <label>Email</label>
                <input type="email" value={email}  onChange={(e) => setEmail(e.currentTarget.value)} name="email" placeholder="username@example.com"/>
                </div>
                <div className="flex">
                <label>Password</label>
                <input type="password" value={password}  onChange={(e) => setPassword(e.currentTarget.value)} name="password" placeholder="username"/>
                </div>
                <button onClick={()=>{submit()}}>Sign Up</button>
            </form>
        </main>
    )
}