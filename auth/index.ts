import { LoggedInUserType } from "@/dataSchemas";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 min")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(user:LoggedInUserType) {

  // Create the session
  const expires = new Date(Date.now() + 60 * 1000 * 60);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("hr_auth", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
   cookies().set("hr_auth", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("hr_auth")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("hr_auth")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() +60* 1000 *60);
  const res = NextResponse.next();
  res.cookies.set({
    name: "hr_auth",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}