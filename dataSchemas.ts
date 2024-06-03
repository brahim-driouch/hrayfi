import * as z from "zod"



export const inputNames: string[] = ["firstName","lastName","email","password","passwordConfirmation"]
export enum AccountType {
    Pro = "Pro",
    Customer = "Customer"
}
export enum UserLang {
    Ar = "ar",
    Fr = "fr"
}

export const userSchema = z.object({
  id:z.number(),
 firstName:z.string().min(2,{message:{fr:"Merci de renseigner votre prénom.",ar:"المرجو إدخال الإسم الشخصي."}}),
 lastName:z.string().min(2,{message:{fr:"Merci de renseigner votre nom.",ar:"المرجو إدخال الإسم العائلي."}}),
 email:z.string().email({message:{fr:"Merci de rensigner une adresse email valide.",ar:"المرجو التأكد من البريد الإلكتروني."}}),
 password:z.string().min(8,{message:{fr:"Le mot de pass doit contenier 8 charactères au moins.",ar:" يجب أن تكون كلمة السر مكونة 8 أرقام أو حروف."}}),
 accountType:z.nativeEnum(AccountType,{message:{fr:"Merci de spécifier le type de compte.",ar:"المرجو إختيار نوع الحساب."}})
 

})

export type User = z.infer<typeof userSchema>
    

export const  registringUserSchema = userSchema.omit({id:true}).extend({
    passwordConfirmation:z.string().min(8,{message:{fr:"Les mots de pass ne correspondent pas.",ar:"كلمتا السر غير متطابقتان."}})
}).refine((data)=>data.password === data.passwordConfirmation,{
   message:{fr:"Les mots de pass ne correspondent pas.",ar:"كلمتا السر غير متطابقتان."},
    params:["passwordConfirmation"]
})
export type NewUser = Omit<z.infer<typeof registringUserSchema> ,"id">

type ServerSuccessResponse<T> = {
    status: "success",
    message?: string,
    data: T
  };
  
  type ServerFailureResponse = {
    status: "failure",
    errors: z.ZodIssue[],
  };
  
  export type ServerResponse<T> = ServerSuccessResponse<T> | ServerFailureResponse