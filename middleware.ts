import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])
const isLoginRoute = createRouteMatcher(['/admin/login'])

const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

const authMiddleware = clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req) && !isLoginRoute(req)) {
        await auth.protect()
      }
    })
  : (_req: NextRequest) => NextResponse.next()

export default authMiddleware

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
