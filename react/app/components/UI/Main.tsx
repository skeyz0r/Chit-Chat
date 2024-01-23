'use client'

import { useState, useEffect } from "react"
import Message from "./Message"

export default function Main(info:{value:string, authordId:Number, chatId:Number})
{
const [text, setText] = useState('')
const [loaded, setLoaded] = useState<string[]>([]);


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
    console.log(response.answer.length, i)
    setLoaded(oldArray =>[...oldArray, response.answer[i].text]) 
 }})
    }
},[ info.chatId])




async function newMessage()
{
    const chatId = info.chatId
    const authorId = info.authordId
  await fetch('/api/newmessage', {method: 'POST',
   body: JSON.stringify({text, authorId, chatId})})
   setLoaded([...loaded, text])
}

    return(
        <div className="flex overflow-y-scroll w-full flex-col">
            <h2 className={`p-2 border-md text-2xl self-end`}>{info.value}</h2>
            <div className="flex h-[85%]">
            {
    loaded.map((data, key) =>{
        console.log(loaded)
        return(
            <Message text={data} date={1} key={key}/>
        )
    })
   }
            </div>
            {
                info.value === '' ? "dsd" :
                <div className="w-full items-center self-end flex justify-evenly border-t h-[15%]">
                    <input value={text} onChange={(e)=>{setText(e.currentTarget.value)}} className="w-[70%] h-10 p-2 text-black outline-none rounded-lg" placeholder="Say hi!"/>
                    <button className="p-2 rounded-e-md border-black border" onClick={()=>{newMessage()}}>Chat</button>
                </div>
            }
        </div>
    )
}