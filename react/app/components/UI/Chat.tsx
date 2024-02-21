'use client'
import { useState, useEffect, useRef } from "react"
import { pusherClient } from "../pusher"
import Message from "./Message"

interface message {
    text:string,
    date:string,
    author:string,
}



export default function Chat_UI(props:{chat_id:Number | undefined, chat_name:string | undefined, user_id:Number, username:string})
{

    const [messages, setMessages] = useState<message[]>([])
    const [text, setText] = useState<string>()
    const ref = useRef<HTMLInputElement>(null)
    const [newMsg, setNew] = useState<boolean>(false)

    useEffect(()=>{
        async function getMsgs()
        {
            if(props.chat_id !== 0)
            {
            const chatId = props.chat_id
            const authorId = props.chat_id
            if(messages && messages.length === 0)
            {
        const msgs = await fetch('/api/messages', {method: 'POST',
         body: JSON.stringify({ authorId, chatId})})
         if(msgs?.ok)
         { 
         msgs.json()
         .then(response => {setMessages(response.answer)})
         .then(()=>scrollToEnd())
         }
         else
         {
            setNew(true)
         }
            }
        
    
            const channel = pusherClient.subscribe(String(chatId));

            channel.bind("newMessage", function (data:any) {         
                setMessages(prevLoaded => [
                    ...prevLoaded,
                    { text: data.text, date: Date.now().toString(), author:data.usr, user_list:String(props.chat_id)},
                  ])})
                
            return () => {
              pusherClient.unsubscribe("chat");
            };
            }
        }
        getMsgs()
        },[props.chat_id])


        function newMessage()
        {
            const chatId = props.chat_id
            const sender = props.user_id
            fetch('/api/newmessage', {
                method: 'POST',
                body: JSON.stringify({text, chatId, sender})
              })
              .then(()=>setNew(false))
        }

        const scrollToEnd = () => {
            ref.current?.scrollIntoView({behavior: "smooth"})
        }


    return(
       <main  className="flex flex-col h-full w-[80%] bg-gray-200">
                    <div className={`${props.chat_id === undefined ? 'hidden' : 'visible'} flex justify-center flex-col items-center 
                    text-2xl h-[10%] bg-white w-full`}>
                            <p className="text-black">{props.chat_name}</p>
                    </div>
        <div className={`${messages.length > 0 ? 'justify-start' : 'justify-center'} py-12 w-full flex flex-col h-[90%] overflow-y-scroll`}>
            {
                newMsg ? <p className="self-center">New Chit-Chat, say Hi!</p> :
                messages.length > 0 ?
                messages.map((data,key)=>{
                    return(
                        <Message sender={data.author === props.username ? true : false} username={data.author} text={data.text} key={key}/>
                    )
                }) : <p className="self-center">Loading Chit-Chat...</p>
            }
                    <div ref={ref}></div>
        </div>
        <div className="mb-4 flex gap-3 justify-center h-[100px] w-full ">
            <textarea value={text} onChange={(e)=>{setText(e.currentTarget.value)}} className="p-3 rounded-lg outline-none flex w-[80%] resize-none bg-white"/>
            <button onClick={()=>newMessage()} className="shadow-md self-center p-3 rounded-e bg-white">Chat</button>
        </div>
        </main>
    )
}