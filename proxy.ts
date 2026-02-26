import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher(["/user-profile"])
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"])

// const isAdminRoute = createRouteMatcher(["/admin(.*)"])
// export default clerkMiddleware(async (auth, req) => {
//   // if (isProtectedRoute(req)) await auth.protect();
//   if (!isPublicRoute(req)) await auth.protect();
// });

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // console.log((await auth()).sessionClaims?.metadata?.role)

  // if (
  //   isAdminRoute(req) &&
  //   (await auth()).sessionClaims?.metadata?.role !== "admin"
  // ) {
  //   const url = new URL("/", req.url);
  //   return NextResponse.redirect(url);
  // }

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


