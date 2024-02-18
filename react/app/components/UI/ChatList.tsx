'use client'
import { useState, useEffect } from "react"


interface Chat {
    name: string;
    id: string;
}

export default function ChatList(props: {setChat:any, id: Number }) {

    const [chat_list, setList] = useState<Chat[]>([]);


    useEffect(() => {
        const id = props.id;
    
        fetch('api/chats', { method: 'POST', body: JSON.stringify({ id }) })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(response => {
                setList(response.answer.map((prevChat:Chat) => ({ name: prevChat.name, id: prevChat.id })));
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.id]);


    return(
        <div className="flex flex-col gap-4 mt-8">
            {
      chat_list?.map((data, key)=>{
        return(
            <div onClick={()=>{props.setChat(data.id)}} className="p-4 border shadow-md bg-white
             flex justify-center items-center" key={key}>{data.name}</div>
        )
      })
    }
      </div>
    )
}