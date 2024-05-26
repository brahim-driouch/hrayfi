import * as z from "zod"
import errorMessages from "./content/errorMessages/index"
export enum AccountType {
    Pro = "Pro",
    Client = "Client"
}

export enum UserLang {
    Ar = "Ar",
    Fr = "Fr"
}

export const userSchema = z.object({
  id:z.number(),
 firstName:z.string().min(2,{message:errorMessages.signUpFormErrors.firstName.fr}),
 lastName:z.string().min(2,{message:errorMessages.signUpFormErrors.lastName.fr}),
 email:z.string().email({message:errorMessages.signUpFormErrors.email.fr}),
 password:z.string().min(8,{message:errorMessages.signUpFormErrors.password.fr}),
 accountType:z.nativeEnum(AccountType,{message:errorMessages.signUpFormErrors.AccountType.fr})
 

})

export type User = z.infer<typeof userSchema>
    

export const  registringUserSchema = userSchema.omit({id:true}).extend({
    passwordConfirmation:z.string().min(8,{message:errorMessages.signUpFormErrors.passowrdConfirmation.fr})
}).refine((data)=>data.password === data.passwordConfirmation,{
    message:errorMessages.signUpFormErrors.passowrdConfirmation.fr,
    params:["passwordConfirmation"]
})
export type NewUser = Omit<z.infer<typeof registringUserSchema> ,"id">