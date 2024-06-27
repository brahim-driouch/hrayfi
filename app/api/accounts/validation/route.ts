import { ServerResponse } from "@/dataSchemas"
import { db } from "@/database/db"
import { CustomError } from "@/utils/CustomError"
import { equal } from "assert"
import { NextResponse } from "next/server"
import { ZodIssue } from "zod"

type ReqData = {
    verificationCode:string,
    userId:string
}

export  async function POST(request:Request):Promise<NextResponse<ServerResponse<Record<string,any>>>>{

    
    // PARSE THE REQUEST BODY
    const data :ReqData= await request.json()

    try {

        // CHECK IF BODY HAS VERIFICATION CODE
        if(!data.verificationCode) throw new CustomError([
            {
                message:{
                    fr:"Code invalide.",
                    ar:"كود غير صحيح"
                },
                path:["generic"],
                code:'custom'
            }
        ])
          // CHECK IF BODY HAS USER_ID AND IS NUMBER
        if(!data.userId || !parseInt(data.userId)) throw new CustomError([
            {
                message:{
                    fr:"Il y a eu une erreur",
                    ar:"Il y a eu une erreur"
                },
                path:["generic"],
                code:'custom'
            }
        ])

    
    // GET THE USER AND THE VERIFICATION CODE
    const user = await db.user.findFirst({
        where:{
            id:parseInt(data.userId)
        }
    })

    console.log(data.verificationCode,user?.verificationCode)

     // CHECK IF THERE IS A USER FOR THE THE ID SENT IN THE REQUEST
    if(!user) throw new CustomError([{
        message:{
            fr:"utilisateur introuvable",
            ar:'utilisateur introuvable.'
        },
        code:"custom",
        path:["generic"]
    }])
     // COMPARE REQUEST VERIFICATION CODE WITH THE ONE IN THE DATABASE 
    if(user.verificationCode !== data.verificationCode){
        throw new CustomError([{
            message:{
                fr:"code invalide h",
                ar:"code invalide hh"
            },
            code:"custom",
            path:["generic"]
        }])
    }
    // UPDATE THE USER ACCOOUNT TO BE VERIIIED
    await db.user.update({
        where:{
            id:user.id
        },
        data:{
            isVerified:true
        }
    })


    // RETURN THE SUCCESS RESPONSE
    return NextResponse.json({
        status:"success",
        data:{valid:'ok'}
    })


    } catch (error:any) {
        let formattedErrors: any;
    let status: number;
    if ("issues" in error) {
      status = 400;
      formattedErrors = error.issues;
    } else if ("message" in error) {
      status = 400;
      formattedErrors = [
        {
          message: {
            fr: error.message,
            ar: "il a eu une erreur",
          },
          code: "custom",
          path: ["generic"],
        },
      ] as ZodIssue[];
    } else {
      status = 500;
      formattedErrors = [
        {
          message: {
            fr: "Il y a eu une erreur.",
            ar: "Il y a eu une erreur.",
          },
          code: "custom",
          path: ["generic"],
        },
      ] as ZodIssue[];
    }

    return NextResponse.json(
      {
        status: "failure",
        errors: formattedErrors,
      },
      { status: status }
    );
    }
}