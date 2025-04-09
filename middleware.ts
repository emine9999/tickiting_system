import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboar","/ticket"];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  // Skip middleware for auth API routes to prevent authentication issues
  if (nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log("token", token);
  const isAuthenticated = !!token;
  console.log("isAuthenticated", isAuthenticated);
  
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
  matcher: [
    "/auth", 
    "/dashboard",
    "/tickets",
    // Exclude all API auth routes from middleware
    "/((?!api/auth).*)"
  ],
};