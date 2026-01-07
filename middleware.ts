// middleware.ts (project root – next to package.json)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run next-intl first (handles locale detection & redirects)
  const response = intlMiddleware(request) ?? NextResponse.next();

  // Generate fresh nonce per request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const isDev = process.env.NODE_ENV === 'development';

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

  // Critical: Set x-nonce on request headers so Next.js injects nonce into its own tags
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Re-create response with modified request (preserves intl cookies/redirects)
  const modifiedResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Copy over any headers/cookies from intlMiddleware response
  response.headers.forEach((value, key) => modifiedResponse.headers.set(key, value));
  response.cookies.getAll().forEach((cookie) => modifiedResponse.cookies.set(cookie));

  // Apply security headers
  modifiedResponse.headers.set('Content-Security-Policy', csp);
  modifiedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  modifiedResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('X-Frame-Options', 'DENY');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  modifiedResponse.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  return modifiedResponse;
}

export const config = {
  matcher: [
    // All HTML pages + locale roots for redirects
    '/',
    '/(ar|en)/:path*',
    // Skip static/_next assets & common static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(png|jpg|jpeg|gif|webp|svg|ico)$).*)',
  ],
};