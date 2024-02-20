
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"
import FrontPage from "./components/UI/Front_Page";
import db from '@/app/components/prisma'

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <>
<FrontPage session={session}/>
  </>
    )}