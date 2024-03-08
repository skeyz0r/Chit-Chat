
import { authOptions } from "./components/auth";
import { getServerSession } from "next-auth"
import FrontPage from "./components/UI/Front_Page";
export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <>
<FrontPage session={session}/>
  </>
    )}