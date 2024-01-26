


export default function Message(info:{sender:boolean, text:string,date:string})
{
    return(
        <div className={`${info.sender ? 'self-end' : 'self-start'} p-3 rounded-md border my-3 w-fit`}>
                <p>{info.text}</p>
        </div>
    )
}