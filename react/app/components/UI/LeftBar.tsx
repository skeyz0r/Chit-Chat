'use client'
import { GiRamProfile } from "react-icons/gi";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { IoIosAddCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import ChatList from "./ChatList";

interface user {
    username:string
}

export default function LeftBar(props:{friends:any, setFriend:any, chat:any, newChat:any, messagges:any, chatList:any, setMessages:any, setList:any, setToast:any, setChat:any, setNewChat:any, username:string, id:Number})
{
    const [usr, findUser] = useState('')
    const [finder, setFinder] = useState('hidden')
    const [found, setFound] = useState<user[]>([{username:'0 results'}])
    const [flex, setFlex] = useState(false)

      useEffect(() => {
        if (finder === 'visible') {
          fetch('/api/findUser', { method: 'POST', body: JSON.stringify({ usr }) })
            .then(response => response.json())
            .then(response => {
              setFound(response.answer);
            });
        }
      }, [usr, finder]);

      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        findUser(e.target.value);
        if (e.target.value.length > 1) {
          setFinder('visible');
        } else {
          setFinder('hidden');
          setFound([{ username: '0 results' }]);
        }
      }

      function closeFinder()
      {
        setFinder('hidden')
        findUser("")
      }

      function createChat()
      {
        props.setNewChat(true)
        props.setChat({id:undefined, name:undefined})
      }

      async function addFriend(username:string)
      {
       const id = Number(props.id)
      const data = await fetch('api/addfriend',{ method: 'POST', body: JSON.stringify({id, username}) })
      const response = await data.json()
        if(data?.ok)
        {
          props.setFriend([...props.friends, response.answer[1]])
        }
        props.setToast({state:'visible', error: response.answer, value:response.message})

      }
    
    return(
        <section className="bg-gray-100 border flex flex-col justify-between items-center h-full w-fit md:w-[20%]">
          <div onClick={()=>setFlex(!flex)} className={` z-10 md:hidden fixed gap-1 
          cursor-pointer ml-12 mt-8 flex flex-col`}>
          <span className={`${!flex ? 'px-3' : 'px-2'} py-[2px] w-full rounded-lg bg-black`}></span>
          <span className={`${!flex ? 'px-2' : 'px-1'} py-[2px] w-full rounded-lg bg-black`}></span>
          <span className={`${!flex ? 'px-3' : 'px-2'} py-[2px] w-full rounded-lg bg-black`}></span>
          </div>
            <div className={`${flex ? 'absolute flex w-[20%]' : 'hidden'} md:flex flex-col justify-center items-center w-full`}>
                <div className="flex flex-col">
                <div>
            <LiaSearchPlusSolid size={38} className="relative shadow rounded-md p-2 top-[64px] -left-[38px]"/>    
            <input value={usr} onChange={(e)=>onChange(e)} className=" mt-8 outline-none border-2  rounded-md"/>
            <span onClick={()=>{closeFinder()}} className={`${finder} cursor-pointer relative -left-5`}>X</span>
            </div>
            <div className={`${finder} rounded-md max-h-[100px] bg-white pr-8 overflow-y-scroll flex flex-col `}>
                    {
                        found.map((data,key)=>{
                            return(
                                <p onClick={()=>{addFriend(data.username)}} key={key}>{data.username}</p>
                            )
                        })
                    }
            </div>
                </div>
                <div onClick={()=>createChat()}
                 className="items-center justify-center cursor-pointer w-[80%] flex mt-6 h-[50px] gap-2 rounded-md shadow-md bg-white">
                  <IoIosAddCircle size={30}/>
                  <p>New Chit-Chat</p>
          </div>
            <ChatList newChat={props.newChat} chat={props.chat} setMessages={props.setMessages}  chatList={props.chatList} setList={props.setList} setChat={props.setChat} id={props.id}/>
            </div>
            <div onClick={()=>{props.setChat({id:undefined, name:props.username})}} className="bg-white cursor-pointer hidden md:flex gap-4 p-4 w-full mx-3 mb-3 justify-center items-center rounded-md border shadow-md">
                <div  className="p-2 rounded-full border"><GiRamProfile size={30}/></div>
                <p>{props.username}</p>
            </div>
        </section>
    )
}