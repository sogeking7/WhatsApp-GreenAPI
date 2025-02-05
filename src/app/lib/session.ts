"use server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const SECRET = "secret";
const KEY = new TextEncoder().encode(SECRET);

export async function encrypt(payload: unknown) {
  // @ts-expect-error
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .sign(KEY);
}

export async function decrypt(input: string | undefined): Promise<unknown> {
  if (!input) return null;
  const { payload } = await jwtVerify(input, KEY, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(
  idInstance: string,
  apiTokenInstance: string,
) {
  const session = await encrypt({ idInstance, apiTokenInstance });
  const cookieStore = await cookies();

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}
