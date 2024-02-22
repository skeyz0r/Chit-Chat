'use client'
import { useState } from "react"

export default function Message(props:{sender:boolean, text:string, username:string, seen:string[]})
{

    const [seen, setSeen] = useState(false)



    return(
        <div className={`${props.sender ? 'self-end' : 'self-start'} px-4`}>
                        <p className="text-sm">{props.username}</p>
            <p className="p-3 rounded-md text-center bg-white border text-black">{props.text}</p>
            { props.seen[0] !== 'viewed' ?
                <div>
                            <span onClick={()=>setSeen(!seen)} className="p-3 text-sm underline cursor-pointer">Seen by</span>
                    <div>
                            <div className={`${seen ? ' opacity-100' : ' opacity-0'} flex gap-4 p-3 border rounded`}>
                        {
                             props.seen.map((data,key)=>{
                                return(
                                    <p key={key} className="text-sm">{data}</p>
                             )})
                        }
                        </div>
                    </div>
                    </div>
                    : props.seen.length !== 0 ? <span className="p-3 text-sm">Seen</span> : <span className="p-3 text-sm">No one</span>

            }
        </div>
    )
}