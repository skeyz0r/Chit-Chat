'use client'
import Chat_UI from "./Chat"
import LeftBar from "./LeftBar"
import { useState } from "react"
import NewChat from "./NewChat"
import Toast from "./Toast"
import Profile from "./Profile"

interface ToastInt{
    state:string,
    error:boolean,
    value:string
}

interface chat{
    id:Number | undefined,
    name:string | undefined
}

    interface Chat {
        name: string;
        id: string;
    }

    interface Message {
        text: string;
        date: string;
        author: string;
        viewed: string[];
    }
    

export default function FrontPage(props:{session:any})
{
    const [chat_list, setList] = useState<Chat[]>([]);
    const [chat, setChat] = useState<chat>({id:undefined, name:undefined})
    const [newChat, setNewChat] = useState(false)
    const [toast, setToast] = useState<ToastInt>({value:"",state:'hidden', error:false})
    const [messages, setMessages] = useState<Message[]>([]);
    const [friends, setFriend] = useState(['loading...'])

    

    return(
        <>
        <Toast Toast={setToast} value={toast.value} state={toast.state} error={toast.error}/>
        <LeftBar friends={friends} setFriend={setFriend} newChat={newChat} messagges={messages} chat={chat} setMessages={setMessages} chatList={chat_list}  setList={setList} setToast={setToast} setNewChat={setNewChat} setChat={setChat} username={String(props.session.user.name)} id={Number(props.session?.user.id)}/>
       { chat.id ?
        <Chat_UI setMessages={setMessages} messages={messages} username={props.session.user.name} chat_name={chat.name} chat_id={chat.id} user_id={Number(props.session.user.id)}/>
        : chat.name ?  <Profile friends={friends} setFriends={setFriend} setToast={setToast} setList={setList} chat_list={chat_list} username={chat.name} session={props.session.user.name}/> : newChat ?
         <NewChat setChat={setChat} setNew={setNewChat} username={props.session.user.name} setList={setList} setToast={setToast} authorId={Number(props.session?.user.id)}/> : 
        <main className="w-full md:w-[80%]"></main>
        }
        </>
    )
}