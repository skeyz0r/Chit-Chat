'use client'

import { Key, useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Chat {
    name: string;
    id: string;
}

interface newChat{
    author:Number,
    name:string
}

export default function NewChat(props:{chat_list:any, setToast:any, setList:any, authorId:Number})
{

    const [friend, setFriend] = useState<string[]>(['loading...'])
    const [select, setSelect] = useState<string[]>([])
    const [menu, setMenu] = useState('hidden')
    const [chatVal, setChatval] = useState<newChat>()
    const path = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = props.authorId;
                const data = await fetch('/api/friends', { method: 'POST', body: JSON.stringify({ id }) });
                if (data.ok) {
                    const response = await data.json();
                    setFriend(response.answer);
                } else {
                    setFriend(["No friends :("]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [props.authorId]);
     

    

    function selector(data:string)
{
    if (select.includes(data)) {
        const index = select.indexOf(data);
        const updatedSelect = [...select];
        updatedSelect.splice(index, 1);
        setSelect(updatedSelect);
      } else {
        setSelect([...select, data]);
}
}


async function createChat() {
    const data = await fetch('/api/newchat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatVal: chatVal, select: select })
    })
    if(data.ok)
    {
        props.setToast({
            state: 'visible',
            error: false,
            value: chatVal?.name + " has been created!"
        });
    
    }
    else
    {
        props.setToast({
            state: 'visible',
            error: true,
            value: chatVal?.name + " ERROR"
        });
    }
}
    return(
        <div className="w-[80%] flex flex-col items-center mt-14">
            <h2 className="text-3xl">Create new Chit-Chat</h2>

            <div className="flex flex-col">
                <label>Chat name</label>
                <input value={chatVal?.name} onChange={(e)=>{setChatval({author:props.authorId, name:e.currentTarget.value})}} type="text" placeholder="My Chit-Chat"/>
                <label>Friends</label>
                <div className="flex flex-col items-center">
            <button className="flex gap-2 items-center justify-center" onClick={()=>{menu === 'visible' ? setMenu('hidden') : setMenu('visible')}}>Select friends 
            {menu === 'visible' ? <FaSortDown className="mb-[14px]" size={30}/> : 
            <FaSortUp className="mt-[13px]" size={30}/>}</button>
                <div className={`${menu} min-w-[82px] w-fit flex flex-col gap-2 p-3 border rounded-md color-white`}>
                {
                    friend.map((data, key)=>{
                        if(data === "No friends :(")
                        {
                            return(
                                <div key={key} className="flex justify-center items-center"> 
                                <option onClick={()=>{selector(data)}}>{data}</option>                              
                                 </div>
                            )
                        }
                        else
                        {
                        return(
                            <div key={key} className="flex gap-4 items-center"> 
                            <option onClick={()=>{selector(data)}}>{data}</option> 
                             <FaCheck className={`${select.includes(data) ? 'visible' : 'hidden'}`} size={18} color="black"/>
                             </div>
                        )
                        }
                    })
                }
                    </div>       
                </div>

                <button onClick={()=>{createChat()}} className="p-4 shadow-md bg-black text-white border rounded-lg">Create Chit-Chat</button>

                <div className="flex flex-col gap-4 mt-8">
            {
            props.chat_list ?     
    props.chat_list.length > 0
    ?                
      props.chat_list?.map((data:Chat, key:Key)=>{
        return(
            <div className="p-4 border shadow-md bg-white
             flex justify-center items-center" key={key}>{data.name}</div>
        )
      }) : <p>Loading chats...</p> : <p>No Chit-Chats, found please create one</p>
    }
      </div>
    </div>
            </div>
    )
}