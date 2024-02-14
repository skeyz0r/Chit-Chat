'use client'

import { useState, useEffect } from "react"
import Message from "./Message"
import { pusherClient } from "../pusher"

interface message {
    text: string,
    date: string,
    sender:Number,
}

export default function Main(info:{value:string, authordId:Number, chatId:Number})
{

const [text, setText] = useState('')
const [loaded, setLoaded] = useState<message[]>([]);
const [amt, setAmt] = useState(0)




useEffect(()=>{

    if(info.chatId !== 0)
    {
    const chatId = info.chatId
    const authorId = info.authordId
  fetch('/api/allmessage', {method: 'POST',
 body: JSON.stringify({ authorId, chatId})})
 .then(response => response.json())
 .then(response => {for(let i = 0; i < response.answer.length; i++)
    {
        setAmt(prevVal => prevVal + 1);
        setLoaded(oldArray =>[...oldArray, {text: response.answer[i].text, date:response.answer[i].date, sender:response.answer[i].sender}]) 
 }})
 
pusherClient.subscribe(String(chatId))
pusherClient.bind('newMessage', messageHandler)
    }
},[ info.chatId])

const messageHandler = (text:string)=>{
    setLoaded(prevLoaded => ([...prevLoaded, {text: text, date: Date.now().toString(), sender: info.authordId}]))
}


async function newMessage()
{
    const chatId = info.chatId
    const sender = info.authordId


  await fetch('/api/newmessage', {method: 'POST',
   body: JSON.stringify({text, chatId, sender})})
}





const pp = {
    app: process.env.APP_ID,
    key: process.env.PUSHER_KEY
}


    return(
        <div className="flex  w-full flex-col">
            <h2 className={`p-2 border-md text-2xl self-end`}>{info.value}</h2>
            <div className="flex overflow-y-scroll flex-col h-[85%]">
            {
    loaded.map((data, key) =>{
        return(
            <Message text={data.text} date={data.date} key={key} sender={data.sender === info.authordId ? true : false}/>
        )
    })
   }
            </div>
            {
                info.value === '' ? "select chat" :
                <div className="bottom-0 w-full items-center self-end flex justify-evenly border-t h-[15%]">
                    <input value={text} onChange={(e)=>{setText(e.currentTarget.value)}} className="w-[70%] h-10 p-2 text-black outline-none rounded-lg" placeholder="Say hi!"/>
                    <button className="p-2 rounded-e-md border-black border" onClick={()=>{newMessage()}}>Chat</button>
                </div>
            }
        </div>
    )
}