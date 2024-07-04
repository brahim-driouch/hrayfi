"use client"
import useAuth from "@/auth/client"
import apiEndPoints from "@/constants/apiEndPoints"
import { navigate } from "@/lib/navigate"
import axios from "axios"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"




const ProfileCardMenu =  () => {
  const [show,setShow]=useState(false)
  const session  = useAuth()
  const menuRef = useRef(null)
  const locale = useLocale()



  const handleClickOutside =(e:MouseEvent)=>{
    
    if(menuRef.current && e.target  && !(menuRef.current as HTMLElement).contains(e.target as Node) ){
      setShow(false)
      console.log("clicked")
    }
  }

  useEffect(() => {
    // Add event listener on document click outside
    document.addEventListener("click",(e)=>handleClickOutside(e));

    // Cleanup function to remove listener on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuRef.current])

  const logout = async()=>{
     await axios.post(apiEndPoints.userService.logout)
     await navigate(`/${locale}/`)
  }




  return (
   <div className="w-full relative"  ref={menuRef} >
   <span onClick={()=>setShow(!show)} className="block w-6 h-6 cursor-pointer bg-gray-400 rounded-full"></span>


    {show && (
       <div  className="w-[300px] flex flex-col justify-start gap-4 absolute top-8 right-0 z-10 border p-8 bg-gray-50 rounded">
       <div className="flex w-full gap-2">
           <span className="w-8 h-8 bg-gray-400 rounded-full">

           </span>
           <div className="flex flex-col">
           <span className="text-sm">
               Brahim DRIOUCH
           </span>
           <span className="text-xs text-gray-500">
             {session?.auth && session.auth.email}
           </span>
           </div>
           
       </div>
       <Link  className="hover:text-gray-950" href={"#"}>
           Mon compte
         </Link >
        <span className="inline-block cursor-pointer hover:text-gray-950" onClick={logout}>
         Se deconnecter
        </span>

   </div>
    )}
   </div>
  )
}

export default ProfileCardMenu