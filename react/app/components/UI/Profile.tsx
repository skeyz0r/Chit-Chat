'use client'
import { signOut } from "next-auth/react";
import { Quicksand, Readex_Pro } from "next/font/google";
import { useEffect, useState } from "react";
import { GiRamProfile } from "react-icons/gi";


interface Chat {
    name: string;
    id: string;
}


const sand = Quicksand({
    weight: ["400", "700"],
    subsets: ["latin"]
})

const readex = Readex_Pro({
    weight: "400",
    subsets: ["latin"]
})

export default function Profile(props:{friends:any, setFriends:any, chat_list:any, setToast:any, setList:any, username:string, session:string})
{

    const [conf, setConf] = useState(false)

    useEffect(()=>{
        
    })

   async function deleteChat(id:string)
    {
        if(conf)
        {
            setConf(false)
      const data = await fetch('api/deletechat',  { method: 'POST', body: JSON.stringify({id})})
            if(data?.ok)
            {
                const updatedChat = props.chat_list.filter((obj:Chat) => obj.id !== id);
             props.setList(updatedChat)
                props.setToast({value:"Chat removed",state:'visible', error:false})
            }  
            else
            {
                props.setToast({value:"Could not remove chat",state:'visible', error:true})
            }
        }
        else
        {
            setConf(true)
            setTimeout(()=>{setConf(false)}, 3000)
        }
    }



   async function deleteFriend(name:string)
    {
        const user = props.session
       fetch('api/deletefriend', {method: 'POST', body: JSON.stringify({user, name})})
       props.setToast({value:"Friend removed",state:'visible', error:false})
       const data = props.friends.filter((friend:any) => friend !== name)
       props.setFriends(data)
    }



    return(
       <main className="w-full md:w-[80%] bg-gray-300 justify-center flex flex-col items-center">
                <div className="p-2 bg-white rounded-full border">
                    <GiRamProfile size={60}/>
            </div>
            <div className="flex flex-col items-center gap-3">
                <p className={`${readex.className} text-4xl`}>{props.username}</p>
                <button className="mb-8 px-2 cursor-pointer p-2 bg-white rounded" onClick={()=>{signOut({
                redirect:true,
                callbackUrl: `${window.location.origin}/sign-in`
            })}}>Sign out</button>
                </div>
            <div className="flex w-full justify-around">
                { props.username === props.session ? 
                    <fieldset className="self-start justify-center ml-8 font-sans flex  p-4 gap-6 overflow-y-scroll flex-wrap
                     max-h-[200px] max-w-[350px]">
                        <legend>Chit-Chats</legend>
            {
    props.chat_list.length > 0
    ?                
      props.chat_list?.map((data:Chat, key:number)=>{
        return(
            <div key={key} className="flex flex-col items-center">
            <div className={`${sand.className} p-4 rounded border shadow-md bg-white
             flex justify-center items-center`} >{data.name}</div>
             <button onClick={()=>deleteChat(data.id)} className={`${readex.className} py-4 px-2 rounded shadow text-white hover:bg-red-600 mt-3 bg-red-500`}>{`${conf ? 'CLICK AGAIN' : 'DELETE'}`}</button>
             </div>
        )
      }) : <p>No Chit-Chats, found please create one</p>
    }
      </fieldset>
                  : ''
                }
                <fieldset className="max-h-[200px] self-start overflow-y-scroll flex-col ml-8 font-sans flex  p-4 gap-6">
                <legend>Friends</legend>
                {
                    props.friends[0] === 'loading...' ? <p>Loading...</p> : props.friends[0] === "No friends :(" ? <p>No friends</p> :
                    props.friends.map((data:string, key:number)=>{
                      return(
                          <div className="flex gap-4 items-center"> 
                          <p className={`${sand.className} p-4 rounded border shadow-md bg-black
                           flex justify-center items-center text-white`} key={key}>{data}</p>
                           <button onClick={()=>{deleteFriend(data)}} className="p-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white w-fit h-fit">REMOVE</button>
                           </div>
                      )      
                    }) 
                }
                </fieldset>
                <fieldset className="border-black border gap-12 flex flex-col p-4 rounded-md ">
                    <legend className="px-2">Account settings</legend>
                        <div className="flex mt-3 gap-3 items-center">
                            <label>Name:</label>
                            <input className="p-2 h-fit w-[100px] rounded outline-none" type="text" placeholder={props.session}/>
                            <button className="h-fit border border-black p-1 text-white rounded-lg bg-green-500">Change</button>
                        </div>
                        <div className="flex mb-3 gap-3 items-center">
                            <label>Password:</label>
                            <div className="flex flex-col gap-3">
                            <input className="p-2 h-fit w-[150px] rounded outline-none" type="password" placeholder="Old password"/>
                            <input className="p-2 h-fit w-[150px] rounded outline-none" type="password" placeholder="New password"/>
                            </div>
                            <button className="h-fit border border-black p-1 text-white rounded-lg bg-green-500">Change</button>
                        </div>
                </fieldset>
                </div>
            </main>
    )
}