import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
    const token = req.cookies.get('access_app')
    const { pathname } = req.nextUrl

    // SE NÃO TEM TOKEN E TENTAR ACESSAR /LOGIN PERMITE
    
    if(!token && pathname === '/login'){
        return NextResponse.next()
    }

    /* ======= TEM TOKEN E TENTAR ACESSAR /LOGIN REDIRECIONA PARA HOME =====*/

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL("/home", req.url))
    }

    /* ====== SE NÃO TEM TOKEN REDIRECIONA PARA O LOGIN ======*/

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public|login|.*\\.(?:png|jpg|jpeg|svg)$).*)"],
}