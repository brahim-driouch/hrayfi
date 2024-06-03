"use client";
import {
  useForm,
  SubmitHandler,
  Message,
} from "react-hook-form";
import Input from "../reusable/Input";
import {
  AccountType,
  NewUser,
  ServerResponse,
  inputNames,
} from "@/dataSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {  ZodIssue } from "zod";
import axios from "axios";
import { useState } from "react";



const RegisterForm = () => {
  const t = useTranslations("RegistrationForm");
  const [genericError,setGenericError]=useState("")
  const t1 = useTranslations("AccountTypeSelection");
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewUser>({
      mode:"onBlur",
    //resolver:zodResolver(registringUserSchema),
    shouldUnregister: true,
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
  const submitForm: SubmitHandler<NewUser> = async (data) => {
    try {

      console?.log("start")
      const response:ServerResponse<string> = await axios.post(
        "/api/users",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            
          },
        
        }
      );
      
      if(response.status === "success"){
        console.log('done')
      }
    } catch (error: any) {
      
      const errors = error.response.data.errors as ZodIssue[]
      const genericErrorMessage = errors.find((err)=>err.path[0].toString() === "generic")?.message[locale as keyof Message]
      if(genericErrorMessage){
        setGenericError(genericErrorMessage)
      }
      errors.map((err)=>{
        setError(err.path[0].toString() as keyof NewUser,{
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
      {inputNames.map((name) => (
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
          name={name as keyof NewUser}
          label={t(name)}
          type={inputType(name)}
        />
      ))}
      <select
        {...register("accountType")}
        defaultValue={""}
        className={`${
          errors["accountType" as keyof typeof errors]?.message
            ? "border-2 border-red-400  focus:border-blue-300 "
            : "border  focus:border-blue-300 focus:border-2"
        } mb-2 outline-none rounded  p-2 py-3 bg-inherit `}
      >
        <option disabled={true} value={""}>
          {t1("accounTypeSelectPrompt")}
        </option>
        {Object.keys(AccountType).map((key) => (
          <option value={key} key={key}>
            {t1(key)}
          </option>
        ))}
      </select>
     {errors["accountType"] && errors["accountType"].message && (
      <span className="text-red-500">
       {errors["accountType"].message[locale as keyof Message]}
      </span>
     )}
      <button className="w-full p-2 mt-6  bg-purple-800 text-white text-xl rounded outline-none hover:bg-purple-900">
        S'inscrie
      </button>
    </form>
  ); 
};

export default RegisterForm;
