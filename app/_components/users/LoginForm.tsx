"use client";

import {
  useForm,
  SubmitHandler,
  Message,
} from "react-hook-form";
import Input from "../reusable/Input";
import {
  LoginUserType,
  ServerResponse,
  loginInputNames,
  loginUserSchema,
} from "@/dataSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {  ZodIssue } from "zod";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { navigate } from "@/lib/navigate";


const LoginForm = () => {
  const t = useTranslations("RegistrationForm");
  const [genericError,setGenericError]=useState("")
  const t1 = useTranslations("AccountTypeSelection");
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginUserType>({
      mode:"onBlur",
     resolver:zodResolver(loginUserSchema),
  
  });
    


  
 
  const inputType = (fieldName: string): React.HTMLInputTypeAttribute => {
    switch (fieldName) {
      case "email":
        return "email";
      case "password":
      case "passwordConfirmation":
        return "password";
      default:
        return "text";
    }
  };




  // submit form
  const submitForm: SubmitHandler<LoginUserType> = async (data) => {
    try {

  
       const response  :AxiosResponse<ServerResponse<string>>=    await axios.post(
        "/api/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            
          },
        
        }
      );

      console.log(response)
 
      
      
      
    } catch (error: any) {
      console.log(error)
      const errors = error.response.data.errors as ZodIssue[]
      const genericErrorMessage = errors?.find((err)=>err?.path[0].toString() === "generic")?.message[locale as keyof Message]
      console.log(genericErrorMessage)
      if(genericErrorMessage){
        setGenericError(genericErrorMessage)
      }
      errors?.map((err)=>{
        setError(err.path[0].toString() as keyof LoginUserType,{
          type:"server",
          message:err.message
        })
      })
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full md:w-3/5 lg:w-2/5  flex flex-col  p-4 shadow-sm "
    >

      {genericError && (
        <span className="text-red-400">
          {genericError}
        </span>
      )}
      {loginInputNames.map((name) => (
        <Input
          message={
            //@ts-ignore
              errors[name as keyof typeof errors]?.message[
              locale as keyof Message
            ] 
          }
          key={name}
          styling={`${
            errors[name as keyof typeof errors]?.message 
            ? "border-2 border-red-400  focus:border-blue-300 "
              : "border  focus:border-blue-300 focus:border-2"
          } mb-2 outline-none rounded  p-2 `}
          register={register}
          name={name as keyof LoginUserType}
          label={t(name)}
          type={inputType(name)}
        />
      ))}
     
    
      <button className="w-full p-2 mt-6  bg-purple-800 text-white text-xl rounded outline-none hover:bg-purple-900">
      Se connecter
      </button>
    </form>
  ); 
};

export default LoginForm;
