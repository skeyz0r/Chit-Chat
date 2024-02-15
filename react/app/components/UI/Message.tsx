


export default function Message(info:{id:string, text:string, sender:boolean,date:string})
{
    return(
        <div id={info.id} className={`${info.sender ? 'self-end' : 'self-start'} p-3 rounded-md border my-3 w-fit`}>
                <p>{info.text}</p>
        </div>
    )
}