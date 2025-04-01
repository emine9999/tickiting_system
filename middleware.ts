import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  const isProtected = protectedRoutes.includes(nextUrl.pathname);

  if (isAuthenticated && nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/auth", "/dashboard", "/profile", ],
};
