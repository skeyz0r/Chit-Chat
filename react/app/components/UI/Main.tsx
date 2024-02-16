'use client'

import { useState, useEffect, useRef } from "react"
import Message from "./Message"
import { pusherClient } from "../pusher"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import News from "./News"

interface message {
    text: string,
    date: string,
    sender: Number,
}

export default function Main(info:{value:string, username:string | undefined,  authordId:Number, chatId:Number})
{

const [text, setText] = useState('')
const [loaded, setLoaded] = useState<message[]>([])
const [newMsg, setNew] = useState(false)
const endRef = useRef<HTMLInputElement>(null)

const scrollToEnd = () => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
}

useEffect(()=>{
setLoaded([])
setNew(false)
    if(info.chatId !== 0)
    {
    const chatId = info.chatId
    const authorId = info.authordId
  fetch('/api/allmessage', {method: 'POST',
 body: JSON.stringify({ authorId, chatId})})
 .then(response => response.json())
 .then(response => {setMessage(response)})
 

pusherClient.subscribe(String(chatId))
pusherClient.bind('newMessage', messageHandler)
return()=>{
    pusherClient.unsubscribe("newMessage")
}
    }

},[ info.chatId])

useEffect(()=>{
    scrollToEnd()
},[loaded])

function setMessage(response:any)
{
    if(response.answer.length === 0)
    {
        setNew(true)
    }
    for(let i = 0; i < response.answer.length; i++)
    {
        setLoaded(oldArray =>[...oldArray, {text: response.answer[i].text, date:response.answer[i].date, sender:response.answer[i].sender}]) 
 }}


const messageHandler = (text:string)=>{
    setLoaded(prevLoaded => [
        ...prevLoaded,
        { text: text, date: Date.now().toString(), sender: Number(info.authordId)},
      ]);
    }



async function newMessage()
{
    const chatId = info.chatId
    const sender = info.authordId
    setNew(false)
   fetch('/api/newmessage', {method: 'POST',
   body: JSON.stringify({text, chatId, sender})})
}




    return(
        info.value === 'news' ? <News true={true} authorId={info.authordId} name={info.username}/> :
        info.value === 'news' ? <News true={true} authorId={info.authordId} name={info.username}/> : info.value === 'profile' ? <News authorId={info.authordId} true={false} name={info.username}/>  : info.value === '' ?  <News authorId={info.authordId} true={true} name={info.username}/> :
        <div className="flex  w-full flex-col">
        <h2 className={`p-2 border-md text-2xl w-full flex justify-center items-center border `}>{info.value}</h2>
<div  className={`${loaded.length === 0 ? 'justify-center' : ''} px-4 flex overflow-y-scroll flex-col h-[85%]`}>
    { newMsg ? <p className="self-center">Start the chit chat in {info.value}</p> :
        loaded.length === 0 ? <div className="self-center items-center flex gap-4"><p className="text-3xl uppercase">Loading</p>
   <AiOutlineLoading3Quarters size={30} id="spinner"/></div> :
loaded.map((data, key) =>{
    return(
<Message id={String(key)} text={data.text} date={data.date} key={key} sender={data.sender === info.authordId ? true : false}/>
)
})
}
<div ref={endRef}></div>
</div>
<div className="bottom-0 w-full items-center self-end flex justify-evenly border-t mb-4">
    <textarea value={text} onChange={(e)=>{setText(e.currentTarget.value)}} className="border my-3 w-[70%] h-32 py-4 resize-none p-2 text-black outline-none rounded-lg" placeholder="Say hi!"/>
    <button className="p-2 rounded-e-md border-black border" onClick={()=>{newMessage()}}>Chat</button>
</div>

</div>
    )
}