


export default function Message(props:{sender:boolean, text:string, username:string})
{
    return(
        <div className={`${props.sender ? 'self-end' : 'self-start'} `}>
                        <p>{props.username}</p>
            <p className="p-3 bg-white border text-black">{props.text}</p>
        </div>
    )
}