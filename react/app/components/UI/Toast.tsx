'use client'
import { IoCloseCircle } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function props(props:{Toast:any, state:string, error:boolean, value:string})
{

    const [toast, setToast] = useState({state:props.state, error:props.error, value:props.value})


    useEffect(()=>{
        if(props.state === 'visible')
{
    setToast({state: props.state, error:props.error, value:props.value})
    setTimeout(() => {
       setToast({state: 'hidden', value:'', error:false})
       props.Toast({state:'hidden',error:false,value:''})
      }, 3000);
    }
    }, [props.state])

    return(
        <div className={`${toast.state} cursor-default gap-3 mt-8 rounded flex justify-center items-center 
         p-3 shadow-md bg-white border absolute`}>
            { toast.error ? <IoCloseCircle color="red" size={20}/> :
            <FaCircleCheck color="green" size={20}/>
             }
            <p>{toast.value}</p>
        </div>
    )
}