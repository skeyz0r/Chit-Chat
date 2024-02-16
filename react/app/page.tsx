import Panel from "./components/UI/Panel";
import db from "./components/prisma";
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"
import Navigator from "./components/UI/Navigator";


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




  return (
    <>
      <Navigator id={session?.user.id}/>
      <Panel chat={chats} authorId={Number(session?.user.id)}/>
    </>
  )
}
