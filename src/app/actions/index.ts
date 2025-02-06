"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

export const getCredentials = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  const jwt = sessionCookie ? await decrypt(sessionCookie) : null;

  if (!jwt) {
    return {
      idInstance: "",
      apiTokenInstance: "",
    };
  }
  return jwt;
};
