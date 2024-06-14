import {  FieldValues, Path, UseFormRegister } from "react-hook-form"




interface InputProps<T extends FieldValues> {
   register:UseFormRegister<T>,
   name:Path<T>,
   label:string,
   styling:string,
   message?:string,
   type:React.HTMLInputTypeAttribute
   
 }
 const Input = <T extends FieldValues,>({register, name, label, styling, message, type}: InputProps<T>) => {
  return (
    <>
       <label className="text-gray-700"> {label}: </label>
       <input {...register(name)} className={styling} type={type}  />
       <span className="text-red-500 px-2">{message} </span>
    </>
  )
}

export default Input