import { NextRequest, NextResponse } from "next/server";
import { decrypt, deleteSession } from "@/app/lib/session";
import { cookies } from "next/headers";
import { getStateInstance } from "@/app/actions/auth";

const protectedRoutes = ["/chat", "/"];
const authPage = "/auth/sign-in";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthPage = path === authPage;

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    //@ts-ignore
    const idInstance = session?.idInstance;
    //@ts-ignore
    const apiTokenInstance = session?.apiTokenInstance;

    if (isProtectedRoute && (!idInstance || !apiTokenInstance)) {
      console.log("User is not authenticated. Redirecting to /auth/sign-in.");
      return NextResponse.redirect(new URL(authPage, req.nextUrl));
    }

    if (idInstance && apiTokenInstance) {
      try {
        const { data } = await getStateInstance({
          idInstance,
          apiTokenInstance,
        });
        if (data.stateInstance !== "authorized" && !isAuthPage) {
          console.log(
            "Instance is NOT authorized. Redirecting to /auth/sign-in.",
          );
          await deleteSession();
          return NextResponse.redirect(new URL(authPage, req.nextUrl));
        }
      } catch (e: unknown) {
        // @ts-expect-error
        console.error(e?.message || "Unknown error");
        // await deleteSession();
      }
    }
  } catch (error) {
    console.error("Middleware error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
