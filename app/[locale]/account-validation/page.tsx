"use client"
import { useSearchParams } from 'next/navigation'
import  apiEndPoints from "@/constants/apiEndPoints"
import { ServerResponse } from "@/dataSchemas"
import { navigate } from "@/lib/navigate"
import axios, { AxiosResponse } from "axios"
import { useLocale, useTranslations } from "next-intl"
import { FormEvent, useState } from "react"
import { ZodIssue } from "zod"

function ValidationCodeSubmissionPage() {
  const [errorMessage,setErrorMessage]= useState<ZodIssue>()
  const [activationCode,setActivationCode]=useState("")
  const locale = useLocale()
  const t = useTranslations("ValidationPage")
  const params = useSearchParams()
   const userId = params.get('uid')

  const onsubmit = async(e:FormEvent)=>{
    e.preventDefault()

    if(!userId) {
       setErrorMessage({
        message:{
          fr:"utilisateur inconu.",
          ar:"utilisateur inconu."
        },
        code:"custom",
        path:["generic"]
      })

      return 
    } 
   
    try {
      const response: AxiosResponse<ServerResponse<boolean>> = await axios.post(apiEndPoints.accountService.accountValidation,{
verificationCode:activationCode ,
userId

 },
{
  headers:{
    "Content-Type":"application/json"
  }
})

if(response.data.status === "success"){
  navigate(`/${locale}/se-connecter`)
}
    } catch (error:any) {
      const errors = error.response.data.errors as ZodIssue[]
      const msg = errors?.find((err)=>err.path[0].toString() === "generic")
      if(msg){
        setErrorMessage(msg)
      }
    }
  }
  return (
    <div   className="w-full flex justify-center py-24 items-center">
      {errorMessage && <span className="text-red-500">{errorMessage.message[locale as keyof typeof errorMessage.message]} </span>}
        <form  onSubmit={(e)=>onsubmit(e)} className="w-full md:w-2/5 gap-3 flex flex-col justify-center items-center">
           <input onChange={(e)=>setActivationCode(e.target.value)} value={activationCode} name="activationCode" className="w-full border rounded p-2" type="text" placeholder={t("InputPlaceholder")}/>
           <input  type="submit" className="w-full p-2 rounded cursor-pointer hover:bg-purple-900 bg-purple-700 text-white" value="Valider" />
        </form>
    </div>
  )
}

export default ValidationCodeSubmissionPage