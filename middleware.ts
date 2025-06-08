import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard",'meetings','analysis','tickets','documents','users','roles','groups'];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  // Skip middleware for auth API routes
  if (nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production' // Use secure cookies in production
    });
    
    const isAuthenticated = !!token;
    const isProtectedPath = protectedRoutes.some(route => 
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
    );
    
    // If authenticated and on login page, redirect to dashboard
    if (isAuthenticated && nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && isProtectedPath) {
      // Store the original URL to redirect back after login
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth?callbackUrl=${callbackUrl}`, request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    // On error, redirect to auth page as a fallback
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: [
    // Match specific routes we want to protect or handle auth redirects for
    '/auth',
    '/dashboard',
    '/dashboard/:path*',
    '/tickets/:path*',
    '/meetings/:path*',
    '/documents/:path*',
    '/users/:path*',
  ]
};
