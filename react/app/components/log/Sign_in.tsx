'use client'
import { useState } from "react"
import { signIn } from "next-auth/react";

export default function Sign()
{

    const [showPsw,setShowPsw] = useState(false)
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setEr] = useState({state:'opacity-0', value:''})

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
             setEr({value:'Wrong username or password', state: 'opacity-1'})
             }
             else
             {
                signIn('')
    }
}
    catch(error)
    {
        console.log(error)
    }
}

async function git_submit(e:React.MouseEvent<HTMLButtonElement>)
{
    e.preventDefault()
    try{
   const SignInData = await signIn('github',{redirect:false});
            if(!SignInData?.ok)
            {
             setEr({value:'Wrong username or password', state: 'opacity-1'})
             }
             else
             {
                signIn('',{
                 callbackUrl: `/main`,
             })
    }
}
    catch(error)
    {
        console.log(error)
    }
}

    return(
        <main className="h-screen flex flex-col gap-3 justify-center items-center w-100">
            <p className={`${error.state}`}>{error.value}</p>
          <form className="flex flex-col gap-3 p-3 rounded-md shadow-md border ">
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}} type="text"/>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                    <input name="passowrd" value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} type={`${showPsw ? 'text' : 'password'}`}/>
                </div>
                <div onClick={()=>{setShowPsw(!showPsw)}} className="flex items-center gap-2">
                    <input checked={showPsw} readOnly type="checkbox"/>
                    <label>Show password</label>
                </div>
                <button onClick={(e)=>{submit(e)}} className="px-3 py-2 rounded-lg shadow-2xl border">Sing in</button>
                <button onClick={(e)=>{git_submit(e)}}>Github</button>
          </form>
        </main>
    )
}