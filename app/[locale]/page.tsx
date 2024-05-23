import {useTranslations} from 'next-intl';
import Hero from '../_components/homePage/hero/Hero';
 
export default function Index() {
  

  return (
    <main className='w-full flex-grow flex flex-col justify-start items-center'>
      <Hero/>
    </main>
  )
}