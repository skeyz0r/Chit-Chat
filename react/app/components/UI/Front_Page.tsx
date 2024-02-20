'use client'
import Chat_UI from "./Chat"
import LeftBar from "./LeftBar"
import { useState } from "react"
import NewChat from "./NewChat"
import Toast from "./Toast"

interface ToastInt{
    state:string,
    error:boolean,
    value:string
}

interface chat{
    id:Number | undefined,
    name:string | undefined
}


export default function FrontPage(props:{session:any})
{

    const [chat, setChat] = useState<chat>({id:undefined, name:undefined})
    const [newChat, setNewChat] = useState(false)
    const [toast, setToast] = useState<ToastInt>({value:"",state:'hidden', error:false})

    return(
        <>
        <Toast setToast={setToast} value={toast.value} state={toast.state} error={toast.error}/>
        <LeftBar setToast={setToast} setNewChat={setNewChat} setChat={setChat} username={String(props.session.user.name)} id={Number(props.session?.user.id)}/>
       { chat.id ?
        <Chat_UI chat_name={chat.name} chat_id={chat.id} user_id={Number(props.session.user.id)}/>
        : newChat ? <NewChat setToast={setToast} authorId={Number(props.session?.user.id)}/> : 
        <main  className="flex flex-col h-full w-[80%] bg-gray-200">

        </main>
        }
        </>
    )
}