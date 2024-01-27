'use client'
import { useState, useEffect } from "react";


export default function Toast(info:{state:string, error:string, value:string, time: number, setToast:any})
{
    const [data, setData] = useState({state: info.state, time:info.time})

    useEffect(()=>{
        if(info.time !== 0)
{
    setData({state: info.state, time:info.time})
    setTimeout(() => {
       setData({state: 'hidden', time:0})
       info.setToast({state: 'hidden', error:'', value:'',time:0})
      }, info.time);
    }
    }, [info.state])



    return(
        <div className={`${data.state} absolute rounded self-center bg-white border-black border-2 border-solid shadow-xl`}>
            <p>{`${info.error}`}</p>
            <p>{`${info.value}`}</p>
        </div>
    )
}