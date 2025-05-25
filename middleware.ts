import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define top-level protected routes
const protectedRoutes = [
  "/dashboard",
  "/tickets",
  "/roles",
  "/groups",
  "/documents",
  "/profile",
  "/users",
  "/analysis",
  "/home"
];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Skip middleware for NextAuth API routes
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  const isProtected = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect authenticated users away from /auth
  if (isAuthenticated && nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except static files and Next.js internals
     * Exclude /api/auth explicitly to avoid token validation errors
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)"
  ],
};
