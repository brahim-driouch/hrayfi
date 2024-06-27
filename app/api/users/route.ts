import { db } from "@/database/db";
import {
  NewUser,
  ServerResponse,
  User,
  registringUserSchema,
} from "@/dataSchemas";
import { CustomError } from "@/utils/CustomError";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";
import bcrypt from "bcrypt";
import sendEmail from "@/lib/sendEmail";
import generateVerificationCode from "@/lib/generateVerificationCode";
import { createSession } from "@/auth";

export const dynamic = "force-dynamic";
export async function POST(
  request: Request
): Promise<NextResponse<ServerResponse<Record<string,any>>>>{
  try {
    const body: NewUser = await request.json();

    await registringUserSchema.parseAsync(body);

    /**
     * @db check if user already exists in the database and
     * persit user to db
     *  */
    const userExists = await db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userExists){
      throw new CustomError([
        {
          message: {
            fr: "Cet email est déjà associé à un autre compte.",
            ar: "هذا البريد الإلكتروني مرتبط بحساب آخر",
          },
          path: ["email"],
          code: "custom",
        },
      ]);
    }


    //  PASSWORD HASHING
    const encryptedPassword = await bcrypt.hash(body.password, 10);

    const { passwordConfirmation, ...dbUser } = body;
    dbUser.password = encryptedPassword;
    // GEERATE A RANDOM 6 DIGITS NUMBER
      const verificationCode = generateVerificationCode()
        dbUser.verificationCode = verificationCode
    // CREATE A RECORD
    const queryRespnse = await db.user.create({
      data: dbUser,
    });

     // SEND VERIFICATION EMAIL 
    const emailResponse = await sendEmail({
      from:"brahim@brahimdriouch.dev",
      to:[queryRespnse.email],
      subject:"Votre code de verification .",
      html:`<h2> Voici le code veriification de votre compte ${verificationCode}. </h2>`

    })

    if(emailResponse?.data?.id){
      return NextResponse.json({
        status: "success",
        data:{
          emailSent:true,
          id:queryRespnse.id.toString()
        }
      });
    }
    
    return  NextResponse.json({
      status: "success",
      data: {
        emailSent:false,
        data:queryRespnse.id.toString()
      } ,
    });
    
  } catch (error: any) {
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
