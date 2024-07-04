
import { type Navlink, navlinks, authLinks} from "@/constants/links/navLinks"

import Link from "next/link"
import ProfileCardMenu from "../../profile/ProfileCardMenu"
import { getLocale, getTranslations } from "next-intl/server"
import { getSession } from "@/auth"


const LargeScreenNavbar =async  () => {
  const t = await getTranslations("Navigation");
  const auth = await getSession()
  const local = await getLocale() || "fr"
  const links = auth?.user  ? navlinks : [...navlinks,...authLinks]



  return (
    <div className="flex  ">
    <ul className="hidden lg:flex justify-center items-center space-x-6">
     {
    links.map((link:Navlink)=>(
        <li key={link.name} className="">
         <Link className={`${link.name === "sInscrire" ?
          " bg-purple-700 text-white p-2 px-8 border border-purple-700 rounded hover:bg-purple-900 "
          : link.name === "seConnecter" ? "border px-7 py-2 rounded border-pruple-700 text-purple-600 hover:bg-purple-50/25"
        : ""}`} href={`/${local}${link.path}`}>
            {t(link.name)}

          </Link>

        </li>
      ))
     }

{auth  && <li >
      <ProfileCardMenu/>
  </li>}
    
    </ul>
     
   
         
         

          
    </div>
  )
 
}

export default LargeScreenNavbar