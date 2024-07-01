import { getSession } from "@/auth";
import { NextResponse } from "next/server";





export async function POST(request:Request){

    const auth = await getSession()

    return NextResponse.json({
        auth:auth?.user
    })
}