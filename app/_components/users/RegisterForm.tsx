"use client";
import {useForm,SubmitErrorHandler, SubmitHandler} from "react-hook-form"
import Input from "../reusable/Input";
import { AccountType, NewUser, registringUserSchema } from "@/dataSchemas";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
const RegisterForm = () => {

 const t = useTranslations("Forms")
  const {register,handleSubmit,formState:{errors}} = useForm<NewUser>(
    {
      mode:"onBlur",  
      resolver:zodResolver(registringUserSchema)}
  )

  function getZodSchemaKeys(schema: ZodSchema): string[] {
    const keys: Record<string, boolean> = {};
    const proxy = new Proxy(keys, {
      get(_, key) {
        if (key === 'then' || typeof key !== 'string') {
          return;
        }
        keys[key] = true;
      },
    });
    schema.safeParse(proxy);
    return Object.keys(keys);
  }
  const inputNames: string[] = getZodSchemaKeys(registringUserSchema);


const submitForm :SubmitHandler<NewUser> =(data)=>console.log(data)
  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-full flex flex-col space-y-1">
      {
        inputNames.map((name)=>(
          <Input  

          message={errors[name as keyof typeof errors]?.message}  
          key={name} 
          styling={`${errors[name as keyof typeof errors]?.message 
            ? "border-2 border-red-400 rounded p-2 outline-none focus:border-blue-300" 
            :"border rounded p-2 outline-none focus:border-blue-300"}`} 
            register={register} 
            name={name as keyof NewUser} 
            label={t(name)}/>
        ))
      }
      <button className="w-full p-2 bg-purple-800 text-white text-xl rounded outline-none">
        S'inscrie
      </button>
        
    </form>
  )
}

export default RegisterForm


