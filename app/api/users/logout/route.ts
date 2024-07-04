import { logout } from "@/auth";
import { ServerResponse } from "@/dataSchemas";
import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request:NextRequest):Promise<NextResponse<ServerResponse<Boolean>>>{

    await logout()
    
    return NextResponse.json({
       status:'success',
       data:true
    })


}