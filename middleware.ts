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

  console.log(auth,isProtected)

 if(isProtected && !auth?.user){
   return NextResponse.redirect(new URL(`/${i18nConfig.defaultLocale}/se-connecter`,request.nextUrl))
 }

 NextResponse.next()


  
}




export default async function middleware(request:NextRequest){
  await authMiddleware(request)

  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(i18nConfig);
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response (example)
  response.headers.set('x-hrayfi_locale', defaultLocale);


  return response
}

// export async function middleware(request:Request){
//   const locale =  'fr' || 'ar'

//   const url = request.url
//   console.log(url)
// }
  
export const config = {
  // Match only internationalized pathnames
  matcher: ['/','/(fr|ar)/:path*']
};