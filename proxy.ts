// middleware.ts (root level!)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';  // your existing config

//  next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // 1. Run next-intl first → handles locale detection, redirects, etc.
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();  // Or just intlMiddleware(request) without headers
  }
  const response = intlMiddleware(request);

  // If next-intl already returned a redirect/response, just return it
  if (response) {
    // 2. Now we add security headers to whatever response came back
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

        const csp = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}';  // ← removed 'unsafe-inline'
        img-src 'self' blob: data: https:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
        block-all-mixed-content;
      `.replace(/\s{2,}/g, ' ').trim();

    // Pass nonce to Next.js internals
    response.headers.set('x-nonce', nonce);
    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    return response;
  }

  // Fallback (shouldn't happen with next-intl)
  return NextResponse.next();
}

// Single unified matcher – safe for both i18n and security headers
export const config = {
  matcher: [
   // Match all paths except internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Include root and locale-prefixed paths for redirects
    '/',
    '/(ar|en)/:path*',
  ],
};