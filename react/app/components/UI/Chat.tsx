'use client'
import { useState, useEffect } from "react"

interface message {
    text:string,
    date:string,
    sender:string
}

export default function Chat_UI(props:{chat_id:Number | undefined, user_id:Number})
{

    const [messages, setMessages] = useState<message[]>([])

    useEffect(()=>{
        if(props.chat_id !== undefined)
        {
        const id = props.chat_id
        fetch('/api/messages', { method: 'POST', body: JSON.stringify({id}) })
        .then(response => response.json())
        .then(response => {
            setMessages(response.answer.map((prevMessage:message) => ({sender:prevMessage.sender, text: prevMessage.text, id: prevMessage.date })));
        })
    }
    },[props.chat_id])


    return(
       <main  className="flex flex-col h-full w-[80%] bg-gray-200">
                    <div className={`${props.chat_id === undefined ? 'hidden' : 'visible'} h-[10%] bg-gray-300 w-full`}>

</div>
        <div className="w-full flex flex-col h-[90%] overflow-y-scroll">
            {
                messages.map((data,key)=>{
                    return(
                        <div className={`${Number(data.sender) === props.user_id ? 'self-end' : 'self-start'} p-4 rounded`} key={key}>{data.text}
                        <p>{data.sender}</p>
                        </div>
                    )
                })
            }
        </div>
            <div className="h-[12%] rounded-t-md w-[98%] self-center bg-white">
                <p>{String(props.chat_id)}</p>
            </div>
        </main>
    )
}