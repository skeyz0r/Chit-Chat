'use client'
import Chat_UI from "./Chat"
import LeftBar from "./LeftBar"
import { useState } from "react"


export default function FrontPage(props:{session:any})
{

    const [chat, setChat] = useState<Number | undefined>(undefined)

    return(
        <>
        <LeftBar setChat={setChat} username={String(props.session.user.name)} id={Number(props.session?.user.id)}/>
        <Chat_UI chat_id={chat} user_id={Number(props.session.user.id)}/>
        </>
    )
}