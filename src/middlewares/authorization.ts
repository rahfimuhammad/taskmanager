import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


export default function authorization(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent ) => {
        const pathname = req.nextUrl.pathname

        if(requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.SECRET
            })

            if(!token) {
                const url = new URL("/api/auth/signin", req.url)
                return NextResponse.redirect(url)
            }
        }
        return middleware(req, next)
    }
}