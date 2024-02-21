import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./prisma";
import { compare } from "bcrypt";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password" }
          },
         authorize: async (credentials: { username: string; password: string } | any) => {

                if(!credentials?.username || !credentials?.password) {
                    return null;
                }
              
                const existingUser = await db.user.findUnique({
                    where:{
                        username:credentials?.username
                    }
                })
                if(!existingUser)
                {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if(!passwordMatch)
                {
                    
                    return null;
                }
                else
                {
                    const data = await db.user.findFirst({
                        where: {
                            username:credentials?.username
                        },
                        select:{
                            id:true
                        }    
                    })
                    cookies().set('id', String(data?.id))
                }

                return(
                    {
                        id: `${existingUser.id}`,
                        username:existingUser.username,
                        email:existingUser.email
                    }
                )
            }
        
        })],
        callbacks:{
            
            async jwt({token,user,trigger,session}){
                if (trigger === "update" && session?.user) {
                    // Note, that `session` can be any arbitrary object, remember to validate it!
                    token.name = session.username
                  }
                if(user){
                    return{
                        ...token, id:user.id, username:user.name, name:user.username
                    }
                }
                return token
            },
            async session({session,token}){
                
                    return{
                        ...session, user:{...session.user, id:token.id, username:token.username}
                    }
                }

        }
}