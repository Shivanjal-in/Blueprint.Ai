import { NextRequest, NextResponse } from "next/server";

//!Middleware.js works only in the ultimate parent directory or source directory
// This function can be marked `async` if using `await` inside
//* Redirect means changing url to a different page and rewriting means staying on the same page but loading the content of different page

import { getToken } from "next-auth/jwt";
export {default} from 'next-auth/middleware'
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl

    if (token && 
        (
            url.pathname.startsWith('/sign-in') || 
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')  ||
            url.pathname.startsWith('/forgot-password')
        )) {
        return NextResponse.redirect(new URL("/", request.url));
    }
  
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ],
};
