import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'


export default async function middleware(request:NextRequest) {
  let cookie = cookies().get('__Secure-next-auth.session-token')


  if(request.nextUrl.pathname === ('/'))
  {
    if(!cookie){
      cookie =  cookies().get('next-auth.session-token')
      if(!cookie)
      {
       return NextResponse.redirect(new URL('/sign-in', request.url))
 
      }
    }
  }
}
export const config = {
    matcher: ['/',  '/signin', ]
  }