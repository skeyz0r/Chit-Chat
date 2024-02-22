import { useState, useEffect, useRef, Key } from "react";
import { pusherClient } from "../pusher";
import Message from "./Message";

interface Message {
    text: string;
    date: string;
    author: string;
    viewed: string[];
}

export default function Chat_UI(props: {messages:any, setMessages:any, chat_id: Number | undefined, chat_name: string | undefined, user_id: Number, username: string }) {
    const [text, setText] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);
    const [newMsg, setNew] = useState<boolean>(false);

    useEffect(() => {
        async function getMsgs() {            
            if (props.chat_id && props.messages.length === 0) {
                const id = props.chat_id;
                const msgs = await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ id }) });
    
                if (msgs.ok) {
                    const response = await msgs.json();
                    props.setMessages(response.answer);
                    scrollToEnd();
                    setNew(false)
                } else {
                    setNew(true);
                }
        
                const channel = pusherClient.subscribe(String(id));
                channel.bind("newMessage", function (data: any) {
                    props.setMessages((prevLoaded: Message[]) => [
                        ...prevLoaded,
                        { text: data.text, date: Date.now().toString(), author: data.usr, viewed: [] },
                    ]);
                });

                return () => {
                    pusherClient.unsubscribe(String(id));
                };
            }
        }
        getMsgs();
        console.log(props.chat_id)
    }, [props.messages]);


    function newMessage() {
        const chatId = props.chat_id;
        const sender = props.user_id;
        fetch('/api/newmessage', {
            method: 'POST',
            body: JSON.stringify({ text, chatId, sender })
        }).then(() => setNew(false));
    }

    const scrollToEnd = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    function viewMsg() {
        const username = props.username;
        const id = props.chat_id;
        fetch('/api/view', {
            method: 'POST',
            body: JSON.stringify({ username, id })
        });
        return(['now seen'])
    }

    return (
        <main className="flex flex-col h-full w-[80%] bg-gray-200 cursor-default">
            <div className={`${props.chat_id === undefined ? 'hidden' : 'visible'} flex justify-center flex-col items-center text-2xl h-[10%] bg-white w-full`}>
                <p className="text-black">{props.chat_name}</p>
            </div>
            <div className={`${props.messages.length > 0 ? 'justify-start' : 'justify-center'} py-12 w-full flex flex-col h-[90%] overflow-y-scroll`}>
                {newMsg ? <p className="self-center">New Chit-Chat, say Hi!</p> :
                    props.messages.length > 0 ?
                        props.messages.map((data:Message, key:Key) => (
                            <Message
                                seen={data.author === props.username && data.viewed.length === 0  ? ['no one'] : data.author === props.username ? data.viewed :
                                 data.viewed.includes(props.username) ? ['seen'] : viewMsg()
                            }
                                sender={data.author === props.username}
                                username={data.author}
                                text={data.text}
                                key={key}
                            />
                        )) : <p className="self-center">Loading Chit-Chat...</p>}
                <div ref={ref}></div>
            </div>
            <div className="mb-4 flex gap-3 justify-center h-[100px] w-full">
                <textarea value={text} onChange={(e) => { setText(e.currentTarget.value) }} className="p-3 rounded-lg outline-none flex w-[80%] resize-none bg-white" />
                <button onClick={newMessage} className="shadow-md self-center p-3 rounded-e bg-white">Chat</button>
            </div>
        </main>
    );
}