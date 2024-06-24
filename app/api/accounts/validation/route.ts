import { ServerResponse } from "@/dataSchemas"
import { CustomError } from "@/utils/CustomError"
import { NextResponse } from "next/server"



export default async function POST(request:Request):Promise<NextResponse<ServerResponse<Record<string,any>>>>{


    const validationCode = await request.json()

    try {
        if(!validationCode) throw new CustomError([
            {
                message:""
            }
        ])
    } catch (error) {
        
    }
}