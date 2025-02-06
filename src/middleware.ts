import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/app/lib/session";
import { getStateInstance } from "@/app/actions/auth";
import { getCredentials } from "@/app/actions";

const protectedRoutes = ["/chat", "/"];
const authPage = "/auth/sign-in";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthPage = path === authPage;

  try {
    const { idInstance, apiTokenInstance } = await getCredentials();

    if (isProtectedRoute && (!idInstance || !apiTokenInstance)) {
      console.log("User is not authenticated. Redirecting to /auth/sign-in.");
      return NextResponse.redirect(new URL(authPage, req.nextUrl));
    }

    if (idInstance && apiTokenInstance) {
      try {
        const { data } = await getStateInstance({
          idInstance: idInstance as string,
          apiTokenInstance: apiTokenInstance as string,
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
