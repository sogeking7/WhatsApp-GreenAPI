"use server";

import { cookies } from "next/headers";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax",
    path: "/",
  },
  duration: 7 * 24 * 60 * 60 * 1000
}

export type Session = {
  idInstance: string;
  apiTokenInstance: string;
};

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .sign(key);
}

export async function decrypt(session?: string | null): Promise<JWTPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    return null;
  }

}

export async function createSession(values: Session) {
  const { idInstance, apiTokenInstance } = values;

  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ idInstance, apiTokenInstance });

  (await cookies()).set(cookie.name, session, {
    ...cookie.options,
    expires,
  });

  redirect("/chat");
}

export async function verifySession(): Promise<Session> {
  const Cookie = (await cookies()).get(cookie.name)?.value;
  const session = await decrypt(Cookie);
  if (!session?.idInstance && !session?.apiTokenInstance) {
    redirect("/auth/sign-in")
  }
  return {
    idInstance: session.idInstance as string,
    apiTokenInstance: session.apiTokenInstance as string,
  }
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect("/auth/sign-in")
}

