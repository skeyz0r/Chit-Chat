import Panel from "./components/UI/Panel";
import db from "./components/prisma";
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"


export default async function Home() {

  const session = await getServerSession(authOptions)


  const chats = await db.chat.findMany({
    where:{
      authorId: Number(session?.user.id)
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
      <Panel chat={chats} authorId={Number(session?.user.id)}/>
    </>
  )
}
