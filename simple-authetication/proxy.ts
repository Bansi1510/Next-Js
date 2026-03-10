import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const publicRoute = [
    "/login",
    "/register",
    "/api/auth",
    "favicon.ico",
    "_next"
  ]
  if (publicRoute.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  } else {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRETE })
    if (!token) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$).*)"
}