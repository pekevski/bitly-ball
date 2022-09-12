import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware';

export const middleware = withMiddlewareAuth({ redirectTo: '/' });

export const config = {
  matcher: [
    '/middleware-protected/:path*',
    '/dashboard/:path*',
    '/rooms/:path*'
  ]
}