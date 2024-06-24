"use client"

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

  const onsubmit = async(e:FormEvent)=>{
    e.preventDefault()
   
    try {
      const response: AxiosResponse<ServerResponse<boolean>> = await axios.post(apiEndPoints.accountService.accountValidation,{
activationCode     
 },
{
  headers:{
    "Content-Type":"application/json"
  }
})

if(response.data.status === "success"){
  navigate(`/${locale}/login?ref=validationprocess`)
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