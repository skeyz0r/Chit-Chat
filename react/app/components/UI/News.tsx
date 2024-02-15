'use client'

import { GiRamProfile } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";


export default function News(check:{true:boolean, authorId:Number, name:string})
{

    const [friends, setFriends] = useState([])



 useEffect(()=>{
    if(check.true === false)
    {
        const id = check.authorId
        fetch('/api/friendslist', {method: 'POST',
        body: JSON.stringify({id})})
        .then(response => response.json())
        .then(response => setFriends(response.answer))
    }
    }, [check.true])

    return( 
        check.true ? 
        <div  className="px-4 flex overflow-y-scroll w-full flex-col h-[85%]">
            <p>News</p>
        </div>
        :
        <div  className="px-4 flex flex-col overflow-y-scroll w-full h-[85%]">
        <div className="mt-20 border rounded-full p-3 self-center">
            <GiRamProfile size={60}/>
        </div>
            <p className="self-center text-4xl mt-4">{check.name}</p>

            <div>
            <div className={`flex w-fit flex-col gap-2 p-3 border rounded color-white`}>
                <p className="border-b font-bold">Friends list</p>
                {
                    friends.length === 0 ? <p>Loading...</p> :
                      friends.map((data, key) =>{
                        return(
                         <div key={key} className="flex justify-between"> 
                            <p className=" cursor-pointer">{data}</p>  <MdDeleteForever className=" cursor-pointer" size={20}/>  
                        </div>
                        )
                    })
                }
                    </div>    
            </div>
    </div>
    )
}