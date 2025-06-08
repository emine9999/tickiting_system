import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Toutes les routes doivent commencer par "/"
const protectedRoutes = [
  "/dashboard",
  "/meetings", 
  "/analysis",
  "/tickets",
  "/documents",
  "/users",
  "/roles",
  "/groups"
];

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
      secureCookie: process.env.NODE_ENV === 'production'
    });
    
    const isAuthenticated = !!token;
    
    // Vérification améliorée des routes protégées
    const isProtectedPath = protectedRoutes.some(route => 
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
    );
    
    // Debug - vous pouvez supprimer ces logs après
    console.log('Current path:', nextUrl.pathname);
    console.log('Is protected:', isProtectedPath);
    console.log('Is authenticated:', isAuthenticated);
    
    // If authenticated and on login page, redirect to dashboard
    if (isAuthenticated && nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && isProtectedPath) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth?callbackUrl=${callbackUrl}`, request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: [
    // Routes d'authentification
    '/auth',
    // Routes protégées - exact match et sous-routes
    '/dashboard/:path*',
    '/tickets/:path*',
    '/meetings/:path*',
    '/documents/:path*',
    '/users/:path*',
    '/roles/:path*',
    '/groups/:path*',
    '/analysis/:path*',
    // Routes exactes (sans sous-routes)
    '/dashboard',
    '/tickets',
    '/meetings',
    '/documents',
    '/users',
    '/roles',
    '/groups',
    '/analysis'
  ]
};