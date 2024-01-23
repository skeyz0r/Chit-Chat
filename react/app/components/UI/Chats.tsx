'use client'

import { CiCirclePlus } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

export default function Chats(chat:{list:Array<any>, value:any, setValue:any, authorId:Number})
{

    const [newChat, setChat] = useState('hidden')
    const [chatVal, setChatVal] = useState({authorId:chat.authorId,name:'',contacts:[]})

async function createChat()
{
    await fetch('/api/newchat', {method: 'POST',
    body: JSON.stringify({chatVal})
})
}

    return(
        <div className="flex flex-col p-2 w-[250px] h-full border-r border-b bg-white">

            <div className={`${newChat} absolute left-1/2  bg-white border-lg shadow-md p-2`}>
                <div>
                <IoCloseSharp size={20} color={"black"} onClick={()=>{setChat('hidden')}}/>
                <p className="text-black">New ChitChat</p>
                </div>
                <div className="flex flex-col">
                <label>Chat name:</label>
                <input value={chatVal.name} onChange={(e)=>{setChatVal({...chatVal, name:e.currentTarget.value})}} className="border rounded" type="text" name="chatName" placeholder="My ChitChat"/>
                <label>Chat image</label>
                <button className="p-1 border rounded-lg self-cetner text-black" onClick={()=>{createChat()}}>Create</button>
                </div>
            </div>

            <div onClick={()=>{setChat('visible')}} className="cursor-pointer flex border justify-evenly self-center rounded-md items-center w-full">
                 <CiCirclePlus size={40} color={"black"}/> <p className="text-black">Start new ChitChat</p>
            </div>
            <div className="mt-4 gap-3 flex flex-col">
                 {
    chat.list.map((data, key) =>{
        return(
            <div key={key} onClick={()=>{chat.setValue({id:data.id, name:data.name})}} className="cursor-pointer flex border justify-evenly self-center rounded-md items-center w-full">
                <p className="text-black">{data.name}</p>
            </div>
        )
    })
   }
    </div>
        </div>
    )
}