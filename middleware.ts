import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'fr'],
 
  // Used when no locale matches
  defaultLocale: 'fr'
});
  
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|ar)/:path*']
};