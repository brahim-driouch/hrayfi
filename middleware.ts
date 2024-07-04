import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';


const protectedRoutes = [
  '/profile'
]


const i18nConfig = {
  // A list of all locales that are supported
  locales: ['ar', 'fr'],
  // Used when no locale matches
  defaultLocale: 'fr',
  
}
async function authMiddleware(request:NextRequest){
  const auth = await getSession()
  const isProtected = protectedRoutes.some(route=>request.nextUrl.pathname.includes(route))


 return isProtected && !auth?.user

  
}




export default async function middleware(request:NextRequest){
  const authMiddlewaResponse = await authMiddleware(request)

  if(authMiddlewaResponse){
    return NextResponse.redirect(new URL(`/${i18nConfig.defaultLocale}/se-connecter`,request.nextUrl))

  }

  // const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(i18nConfig);
    return  handleI18nRouting(request);
 
  // // Step 3: Alter the response (example)
  // response.headers.set('x-hrayfi_locale', defaultLocale);


}

// export async function middleware(request:Request){
//   const locale =  'fr' || 'ar'

//   const url = request.url
//   console.log(url)
// }
  
export const config = {
  // Match only internationalized pathnames
  matcher: ['/','/(fr|ar)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};