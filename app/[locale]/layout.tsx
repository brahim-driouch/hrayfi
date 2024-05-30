import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Header from '../_components/shared/Header';
import './globals.css'
 
export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" :"ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>

          <div className='w-full flex min-h-screen flex-col justify-start items-center px-2 md:px-14 lg:px-24 text-gray-700'>
            <Header />
          {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}