import { NewUser, ServerResponse, registringUserSchema } from "@/dataSchemas";
import { CustomError } from "@/urils/CustomError";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";


export const dynamic = "force-dynamic"
export async function POST(request: Request):Promise<NextResponse<ServerResponse<string>>> {


  try {
    const body:NewUser = await request.json();

    await registringUserSchema.parseAsync(body);
    
    return NextResponse.json({
      status: "success",
      data: "",
    });
  } catch (error: any) {
  console.log(error)

let formattedErrors:any;
let status:number;
if("issues" in error){
  status = 400;
  formattedErrors = error.issues
} else if("message" in error){
    status = 400;
    formattedErrors = [{
        message:{
            fr:"Merci de bien vouloir remplir le formulaire complet.",
            ar:"Merci de bien vouloir remplir le formulaire complet."
        },
        code:"custom",
        path:["gerenic"]
    }] as ZodIssue[]
} else {
    status=500  
    formattedErrors = [{
        message:{
            fr:"Il y a eu une erreur.",
            ar:"Il y a eu une erreur."
        },
        code:"custom",
        path:["generic"]
    }] as ZodIssue[]
}

    return NextResponse.json({
      status: "failure",
      errors :formattedErrors
    },{status:status});
  }
}


export async function GET(){
    return NextResponse.json({
        message:"hello world"
    })
}
