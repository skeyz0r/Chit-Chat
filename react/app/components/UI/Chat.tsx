'use client'
import { useState, useEffect, useRef } from "react"
import { pusherClient } from "../pusher"

interface message {
    text:string,
    date:string,
    sender:string,
    user_list:any
}



export default function Chat_UI(props:{chat_id:Number | undefined, chat_name:string | undefined, user_id:Number})
{

    const [messages, setMessages] = useState<message[]>([])
    const [text, setText] = useState<string>()
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
            if(props.chat_id !== 0)
            {
            const chatId = props.chat_id
            const authorId = props.chat_id
            if(messages.length === 0)
            {
          fetch('/api/messages', {method: 'POST',
         body: JSON.stringify({ authorId, chatId})})
         .then(response => response.json())
         .then(response => {setMessages(response.answer)})
         .then(()=>scrollToEnd())
            }
        
        pusherClient.subscribe(String(chatId))
        pusherClient.bind('newMessage', messageHandler)
        return()=>{
            pusherClient.unsubscribe("newMessage")
        }
            }
        
        },[props.chat_id])

        const messageHandler = (text: string) => {
           console.log(text)
        };

        async function newMessage()
        {
            const chatId = props.chat_id
            const sender = props.user_id
            fetch('/api/newmessage', {
                method: 'POST',
                body: JSON.stringify({text, chatId, sender})
              })
                .then(response => response.json())
                .then(response =>  setMessages(prevMessages => {
                    return [
                        ...prevMessages,
                        { text: text!, date: Date.now().toString(), sender: response.answer, user_list: String(props.chat_id) },
                    ];
                }))

        }

        const scrollToEnd = () => {
            ref.current?.scrollIntoView({behavior: "smooth"})
        }


    return(
       <main  className="flex flex-col h-full w-[80%] bg-gray-200">
                    <div className={`${props.chat_id === undefined ? 'hidden' : 'visible'} flex justify-center flex-col items-center 
                    text-2xl h-[10%] bg-gray-400 w-full`}>
                            <p className="text-white">{props.chat_name}</p>
                    </div>
        <div className={`${messages.length > 0 ? 'justify-start' : 'justify-center'} py-12 w-full flex flex-col h-[90%] overflow-y-scroll`}>
            {
                messages.length > 0 ?
                messages.map((data,key)=>{
                    return(
                        <div className={`${Number(data.sender) === props.user_id ? 'self-end' : 'self-start'}  p-4 rounded`} key={key}>{data.text}
                        <p>{data.sender}</p>
                        </div>
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