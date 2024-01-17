'use client'

import { useState } from "react"

import Chats from "./Chats"
import Main from "./Main"

export default function Panel(info:{chat:Array<any>})
{
    const [chat, setChat] = useState({name:'', id:''})
    

    return(
        <main className="flex h-[95%]">
        <Chats list={info.chat} value={chat} setValue={setChat}/>
        <Main value={chat.name}/>
        </main>
    )
}