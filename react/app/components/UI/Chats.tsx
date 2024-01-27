'use client'

import { CiCirclePlus } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";



export default function Chats(chat:{list:Array<any>, value:any, setValue:any, authorId:Number})
{

    const [newChat, setChat] = useState('hidden')
    const [chatVal, setChatVal] = useState({authorId:chat.authorId,name:''})
    const [friend, setFriend] = useState<string[]>(['loading...'])
    const [select, setSelect] = useState<string[]>([])
    const [menu, setMenu] = useState('hidden')

 function createChat()
{
     fetch('/api/newchat', {method: 'POST',
    body: JSON.stringify({chatVal,select})
})
}

function friendsList()
{
    setChat('visible')
    const id = chat.authorId
    fetch('/api/friendslist', {method: 'POST',
    body: JSON.stringify({id})})
    .then(response => response.json())
    .then(response => setFriend(response.answer))
    console.log(select)
}

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
  
console.log(select)
}


    return(
        <div className="flex flex-col p-2 w-[250px] h-full border-r border-b bg-white">

            <div className={`${newChat} absolute left-1/2  bg-white border-lg shadow-md p-2`}>
                <div>
                <IoCloseSharp size={20} color={"black"} onClick={()=>{setChat('hidden')}}/>
                <p className="text-black">New ChitChat</p>
                </div>
                <div className="flex flex-col">
                <label>Chat name:</label>
                <input value={chatVal.name} onChange={(e)=>{setChatVal({...chatVal, name:e.currentTarget.value})}} className="border rounded" type="text" name="chatName" placeholder="My ChitChat"/>
                <div className="flex flex-col">
            <button onClick={()=>{menu === 'visible' ? setMenu('hidden') : setMenu('visible')}}>Select friends &nbsp; ▼</button>
                <div className={`${menu} flex flex-col gap-2 p-3 border rounded color-white`}>
                {
                      friend.map((data, key) =>{
                        return(
                         <div key={key} className="flex"> 
                            <option onClick={()=>{selector(data)}} >{data}</option>    
                             <FaCheck className={`${select.includes(data) ? 'visible' : 'hidden'}`} size={15} color="black"/>
                        </div>
                        )
                    })
                }
                    </div>       
                </div>
                <label>Chat image</label>
                <button className="p-1 border rounded-lg self-cetner text-black" onClick={()=>{createChat()}}>Create</button>
                </div>
            </div>

            <div onClick={()=>{friendsList()}} className="cursor-pointer flex border justify-evenly self-center rounded-md items-center w-full">
                 <CiCirclePlus size={40} color={"black"}/> <p className="text-black">Start new ChitChat</p>
            </div>
            <div className="mt-4 gap-3 flex flex-col">
                 {
    chat.list.map((data, key) =>{
        return(
            <div key={key} onClick={()=>{chat.setValue({id:data.id, name:data.name})}} className="cursor-pointer flex border justify-evenly self-center rounded-md items-center w-full">
                <p className="text-black">{data.name}</p>
            </div>
        )
    })
   }
    </div>
        </div>
    )
}