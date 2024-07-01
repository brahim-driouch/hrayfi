import { db } from "@/database/db";
import {
  LoggedInUserType,
    LoginUserType,
  ServerResponse,
  loginUserSchema,
} from "@/dataSchemas";
import { CustomError } from "@/utils/CustomError";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";
import bcrypt from "bcrypt";
import { createSession } from "@/auth";


export const dynamic = "force-dynamic";
export async function POST(
  request: Request
): Promise<NextResponse<ServerResponse<string>>  | null> {
  try {
    const body: LoginUserType = await request.json();

    await loginUserSchema.parseAsync(body);

    /**
     * @db check if user already exists in the database and
     * persit user to db
     *  */
    const userExists = await db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!userExists){
      throw new CustomError([
        {
          message: {
            fr: "Cet adresse email ne semble associée à aucun compte.",
            ar: "لا يوجد مستخدم بهذا البريد الإلكتروني.",
          },
          path: ["email"],
          code: "custom",
        },
      ]);
    }


    //  PASSWORD COMPARING

    if(!bcrypt.compare(body.password,userExists.password)) {
        throw new CustomError([
            {
              message: {
                fr: "Merci de vérifier votre email/mot de pass.",
                ar: "المرجو التأكد من المعلومات.",
              },
              path: ["generic"],
              code: "custom",
            },
          ]);
        }

       
    
     const {password, ...user} = userExists
    // START SESSION 
    await createSession(user as LoggedInUserType)
   
  
 return NextResponse.json({
  status:"success",
  data:"connexion reussie"
 })


} catch (error: any) {
    console.log(error);

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

