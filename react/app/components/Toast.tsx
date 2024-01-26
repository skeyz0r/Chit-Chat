'use client'
import { useState, useEffect } from "react";


export default function Toast(info:{state:string, error:string, value:string, time: number, setToast:any})
{
    const [data, setData] = useState({state: info.state, time:info.time})

    console.log(data, info)
    useEffect(()=>{
        if(info.time !== 0)
{
    setData({state: info.state, time:info.time})
  info.setToast({state: 'hidden', error:'', value:'',time:0})
    setTimeout(() => {
       setData({state: 'hidden', time:0})
      }, info.time);
    }
    }, [info.state])



    return(
        <div className={`${data.state} absolute rounded bg-white border-black border-2 border-solid shadow-xl`}>
            <p>{`${info.error}`}</p>
            <p>{`${info.value}`}</p>
        </div>
    )
}