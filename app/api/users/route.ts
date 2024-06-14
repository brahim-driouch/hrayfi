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

export const dynamic = "force-dynamic";
export async function POST(
  request: Request
): Promise<NextResponse<ServerResponse<string>>> {
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
  
    // CREATE A RECORD
    const queryRespnse = await db.user.create({
      data: dbUser,
    });

   
     // SEND VERIFICATION EMAIL 
    await sendEmail({
      from:"brahimdriouch.dev@gmail.com",
      to:[queryRespnse.email],
      subject:"Vérifier votre compte.",
      text:"<h1>Merci de verifier votre compte</h1>"

    })

    return NextResponse.json({
      status: "success",
      data: queryRespnse.id.toString() ,
    });
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
          path: ["gerenic"],
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
