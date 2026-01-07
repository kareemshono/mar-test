// middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run next-intl first (locale detection, redirects, cookies)
  const response = intlMiddleware(request) ?? NextResponse.next();

  // Generate nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const isDev = process.env.NODE_ENV === 'development';

  // Strict CSP – no 'unsafe-inline' on styles thanks to nonce injection
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'nonce-${nonce}'`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `frame-ancestors 'none'`,
    `block-all-mixed-content`,
    `upgrade-insecure-requests`,
  ].join('; ');

  // Set nonce on request headers → Next.js auto-applies it to all its scripts/styles
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create new response preserving intl changes
  const securedResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Copy intl cookies/headers if any
  response.headers.forEach((value, key) => securedResponse.headers.set(key, value));
  response.cookies.getAll().forEach(cookie => securedResponse.cookies.set(cookie));

  // Apply security headers
  securedResponse.headers.set('Content-Security-Policy', csp);
  securedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  securedResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  securedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  securedResponse.headers.set('X-Frame-Options', 'DENY');
  securedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  securedResponse.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  return securedResponse;
}

// Clean matcher – no capturing groups, covers i18n + skips assets safely
export const config = {
  matcher: [
    // Root for locale redirects
    '/',
    // Locale-prefixed paths
    '/(ar|en)/:path*',
    // All other HTML/page requests (negative lookahead, no capturing groups)
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};