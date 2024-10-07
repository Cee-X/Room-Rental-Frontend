import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/register' 
  const isDashboardPath = path.startsWith('/dashboard')
  const token = request.cookies.get('token')?.value || ''
  const role = request.cookies.get('role')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if(isDashboardPath && role !== 'admin'){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/profile',
    '/profile/bookings',
    '/profile/reviews',
    '/dashboard',
    '/dashboard/rooms',
    '/dashboard/bookings',
    '/login',
    '/register',
  ],
}