import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher(["/user-profile"])
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
])

// const isAdminRoute = createRouteMatcher(["/admin(.*)"])
// export default clerkMiddleware(async (auth, req) => {
//   // if (isProtectedRoute(req)) await auth.protect();
//   if (!isPublicRoute(req)) await auth.protect();
// });

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Not signed in and trying to access a protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Signed in users: only redirect away from public entry/auth pages
  if (
    userId &&
    (pathname === "/" ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/collection", req.url));
  }

  // Let everything else continue normally
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


