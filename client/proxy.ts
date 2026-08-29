import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get('help_desk_token')
  const { pathname } = request.nextUrl

  // SE NÃO TEM TOKEN E TENTAR ACESSAR /LOGIN PERMITE

  if (!token && pathname === '/login') {
    return NextResponse.next()
  }

  /* ======= TEM TOKEN E TENTAR ACESSAR /LOGIN REDIRECIONA PARA HOME =====*/

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL("/", request.url))
  }

  /* ====== SE NÃO TEM TOKEN REDIRECIONA PARA O LOGIN ======*/

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:png|jpg|jpeg|svg)$).*)"],
}