// middleware.ts (project root – next to package.json)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request) ?? NextResponse.next();

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const isDev = process.env.NODE_ENV === 'development';

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'nonce-${nonce}'`,
    `img-src 'self' blob: data: https:`,  // ← Fixed images (https: for external)
    `font-src 'self' data:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `frame-ancestors 'none'`,  // ← Clickjacking protection (modern browsers)
    `block-all-mixed-content`,
    `upgrade-insecure-requests`,
  ].join('; ');

  // Set nonce on request → Next.js auto-injects into all scripts/styles
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const securedResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Preserve next-intl headers/cookies
  response.headers.forEach((value, key) => securedResponse.headers.set(key, value));
  response.cookies.getAll().forEach(cookie => securedResponse.cookies.set(cookie));

  // Apply headers
  securedResponse.headers.set('Content-Security-Policy', csp);
  securedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  securedResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  securedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  securedResponse.headers.set('X-Frame-Options', 'DENY');  // ← Clickjacking (legacy browsers)
  securedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  securedResponse.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  return securedResponse;
}

// Official next-intl recommended matcher – builds fine, covers everything
export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};