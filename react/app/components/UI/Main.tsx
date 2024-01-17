

export default function Main(info:{value:string})
{
    return(
        <div className="flex overflow-y-scroll w-full flex-col">
            <h2 className={`p-2 border-md text-2xl self-end`}>{info.value}</h2>
            <div className="flex h-[85%]">

            </div>
            {
                info.value === '' ? "dsd" :
                <div className="w-full items-center self-end flex justify-evenly border-t h-[15%]">
                    <input className="w-[70%] h-10 p-2 text-black outline-none rounded-lg" placeholder="Say hi!"/>
                    <button className="p-2 rounded-e-md border-white border">Chit</button>
                </div>
            }
        </div>
    )
}