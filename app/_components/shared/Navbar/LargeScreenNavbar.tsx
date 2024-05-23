import { type Navlink, navlinks, authLinks} from "@/content/links/navLinks"
import { useTranslations } from "next-intl"
import Link from "next/link"


const LargeScreenNavbar = () => {
  const t = useTranslations("Navigation");

  return (
    <ul className="hidden lg:flex justify-center items-center space-x-6">
     {
     [...navlinks,...authLinks].map((link:Navlink)=>(
        <li key={link.name} className="">
         <Link className={`${link.name === "sInscrire" ? 
          " bg-purple-700 text-white p-2 px-8 border border-purple-700 rounded hover:bg-purple-900 " 
          : link.name === "seConnecter" ? "border px-7 py-2 rounded border-pruple-700 text-purple-600 hover:bg-purple-50/25" 
        : ""}`} href={link.path}>
            {t(link.name)}
        
          </Link>
        </li>
      ))
     }
    </ul>
  )
}

export default LargeScreenNavbar