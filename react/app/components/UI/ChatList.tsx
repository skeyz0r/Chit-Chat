'use client'
import { useState, useEffect, Key } from "react"


interface Chat {
    name: string;
    id: string;
}



export default function ChatList(props:{chat:any, setMessages:any, chatList:any, setList:any, setChat:any, id: Number }) {


    useEffect(() => {
        async function getChats() {
            const id = props.id;
            const data = await fetch('api/chats', { method: 'POST', body: JSON.stringify({ id }) });
    
            if (!data.ok) {
                console.log("error");
            } else {
                const response = await data.json();
                props.setList(response.answer.map((prevChat:Chat) => ({ name: prevChat.name, id: prevChat.id })));
            }
        }
    
        getChats();
    }, [props.chatList]);

    function chatnew(data:any)
    {
        if(props.chat.id !== data.id)
        {
        props.setChat({id:data.id, name:data.name})
        props.setMessages([])
        }
    }

    return(
        <div className="flex flex-col gap-4 mt-8">
            {
      props.chatList.map((data:Chat, key:Key)=>{
        return(
            <div onClick={()=>{chatnew(data)}} 
            className="p-4 border shadow-md bg-white
             flex justify-center items-center" key={key}>
                <p>{data.name}</p>
            </div>
        )
      })
    }
      </div>
    )
}