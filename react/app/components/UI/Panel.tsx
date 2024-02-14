'use client'

import { useState } from "react"

import Chats from "./Chats"
import Main from "./Main"

export default function Panel(info:{chat:Array<any>, authorId:Number})
{
    const [chat, setChat] = useState({name:'', id:0})


    return(
        <main className="flex h-[95%]">
        <Chats list={info.chat} value={chat} setValue={setChat} authorId={info.authorId}/>
        <Main value={chat.name} authordId={info.authorId} chatId={chat.id}/>
        </main>
    )
}