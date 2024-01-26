'use client'

import { useState, useEffect } from "react"

interface user{
    username:string
}

export default function Navigator()
{
    const [usr, findUser] = useState('')
    const [finder, setFinder] = useState('hidden')
    const [found, setFound] = useState<user[]>([{username:'0 results'}])
      
      useEffect(() => {
        if (finder === 'visible') {
          fetch('/api/finduser', { method: 'POST', body: JSON.stringify({ usr }) })
            .then(response => response.json())
            .then(response => {
              setFound(response.answer);
            });
        }
      }, [usr]);

      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        findUser(e.target.value);
        
        if (e.target.value.length > 1) {
          setFinder('visible');
        } else {
          setFinder('hidden');
          setFound([{ username: '0 results' }]);
        }
      }


    return(
        <nav className="flex w-full h-[6%] border-y">
            <div className="absolute">
            <input className="p-2 rounded outline-none" value={usr}
             onChange={(e)=>{onChange(e)}} placeholder="Find friends"></input>
             <div className={`${finder} flex flex-col gap-3 p-3 h-40 bg-black w-60`}>
      { 
      found.map((data, key) =>{
        return(
          <p className="text-white" key={key}>{data.username}</p>
        )
    })
   
      }       
             </div>
            </div>
        </nav>
    )
}