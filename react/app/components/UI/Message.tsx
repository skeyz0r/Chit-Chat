'use client'
import { useEffect, useState } from "react"
import { Quicksand, Readex_Pro } from "next/font/google";
import { pusherClient } from "../pusher";

const sand = Quicksand({
    weight: ["400", "700"],
    subsets: ["latin"]
})

const readex = Readex_Pro({
    weight: "400",
    subsets: ["latin"]
})

export default function Message(props:{chatId:string, sender:boolean, text:string, username:string, seen:string[]})
{

    const [seen, setSeen] = useState(false)
    const [view, setView]  = useState([{username:'no one'}])



    return(
        <div className={`${props.sender ? 'self-end' : 'self-start'} my-4 px-4`}>
                        <p className={`${readex.className} text-sm`}>{props.username}</p>
            <p className={`${sand.className} p-3 rounded-md text-center bg-white border text-black`}>{props.text}</p>
            { props.seen[0] === 'viewed' || props.seen[0] === 'now seen' || props.seen[0] === 'seen' ? 
             <span className={`${sand.className} text-sm`}>{props.seen[0]}</span> : props.seen[0] === 'no one' ? 
             
             <div>
             <span onClick={()=>setSeen(!seen)} className={`${sand.className} text-sm underline cursor-pointer`}>Seen by</span>
     <div>
             <div className={`${seen ? ' visible' : 'hidden'} flex gap-4  border rounded`}>
         {
              view.map((data,key)=>{
                 return(
                     <p key={key} className=" font-sans text-sm">{data.username}</p>
              )})
         }
         </div>
     </div>
     </div> 
             :
                <div>
                            <span onClick={()=>setSeen(!seen)} className={`${sand.className} text-sm underline cursor-pointer`}>Seen by</span>
                    <div>
                            <div className={`${seen ? ' visible' : 'hidden'} flex gap-4  border rounded`}>
                        {
                             props.seen.map((data,key)=>{
                                return(
                                    <p key={key} className=" font-sans text-sm">{data}</p>
                             )})
                        }
                        </div>
                    </div>
                    </div> 

            }
        </div>
    )
}