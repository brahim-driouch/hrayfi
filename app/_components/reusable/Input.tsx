import { NewUser } from "@/dataSchemas"
import { FieldError, RegisterOptions, UseFormRegister, UseFormRegisterReturn } from "react-hook-form"




interface InputProps {
   register:UseFormRegister<NewUser>,
   name:keyof NewUser,
   label:string,
   styling:string,
   message?:string
   
 }
const Input = ({register,name,label,styling,message}:InputProps) => {
  return (
    <>
       <label className="text-gray-700"> {label}: </label>
       <input {...register(name)} className={styling}  />
       <span className="text-red-500 px-2">{message} </span>

    </>
  )
}

export default Input