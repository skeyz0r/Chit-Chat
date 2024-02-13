import Panel from "./components/UI/Panel";
import db from "./components/prisma";
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"
import Navigator from "./components/UI/Navigator";
import Pusher from "pusher-js";

export default async function Home() {

  const session = await getServerSession(authOptions)

  const chats = await db.chat.findMany({
    where:{
      OR: [
        {
          authorId: Number(session?.user.id)
        },
       {user_list:{has:Number(session?.user.id)}}
      ],
    },
    select:{
      id:true,
      authorId: true,
      name: true,
      image: true
    }
  })

  let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: 'us2'
  });

  let channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(data:any) {
    console.log(JSON.stringify(data));
  });

  const e_pusher = {
    app:process.env.PUSHER_KEY
  }


  return (
    <>
      <Navigator id={session?.user.id}/>
      <Panel pusher={e_pusher} chat={chats} authorId={Number(session?.user.id)}/>
    </>
  )
}
