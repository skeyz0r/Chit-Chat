'use client'

import { useState, useEffect } from "react"

import Chats from "./Chats"
import Main from "./Main"

export default function Panel(info:{chat:Array<any>, authorId:Number})
{
    const [chat, setChat] = useState({name:'', id:0})
    const [username, setUsername] = useState('')

    useEffect(()=>{
        const id = info.authorId
        fetch('/api/getUsr', {method: 'POST',
        body: JSON.stringify({id})})
        .then(response => response.json())
        .then(response => setUsername(response.answer.username))
    },[info.authorId])
    
    return(
        <main className="flex h-[95%]">
        <Chats list={info.chat} username={username} value={chat} setValue={setChat} authorId={info.authorId}/>
        <Main value={chat.name} username={username} authordId={info.authorId} chatId={chat.id}/>
        </main>
    )
}