import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/chat", "/"];
const publicRoutes = ["/auth/sign-in"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /auth/sign-in if the user is not authenticated

  if (
    isProtectedRoute &&
    // @ts-ignore
    (!session?.idInstance || !session?.apiTokenInstance)
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
  }

  // 5. Redirect to /chat if the user is authenticated
  if (
    isPublicRoute &&
    // @ts-ignore
    session?.idInstance &&
    // @ts-ignore
    session?.apiTokenInstance &&
    !req.nextUrl.pathname.startsWith("/chat")
  ) {
    return NextResponse.redirect(new URL("/chat", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
