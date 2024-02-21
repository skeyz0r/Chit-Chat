
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"
import FrontPage from "./components/UI/Front_Page";
import { cookies } from "next/headers";

export default async function Home() {

  const session = await getServerSession(authOptions)

   const userId = cookies().get('id')?.value



  return (
    <>
<FrontPage session={session} userId={Number(userId)}/>
  </>
    )}