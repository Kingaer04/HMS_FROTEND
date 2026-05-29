import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_ROUTES, Role } from "@/types/auth.types";

const PROTECTED_PREFIXES = ["/admin", "/doctor", "/receptionist", "/patient", "/lab"];
const AUTH_PREFIX = "/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read auth from cookie (set by client after login)
  const authCookie = request.cookies.get("hms-token")?.value;
  const roleCookie = request.cookies.get("hms-role")?.value as Role | undefined;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuth = pathname.startsWith(AUTH_PREFIX) || pathname.startsWith("/register");

  // Unauthenticated visiting protected route
  if (isProtected && !authCookie) {
    return NextResponse.redirect(new URL("/login/hospital", request.url));
  }

  // Authenticated visiting login/register
  if (isAuth && authCookie && roleCookie) {
    const route = ROLE_ROUTES[roleCookie] || "/admin";
    return NextResponse.redirect(new URL(route, request.url));
  }

  // Root redirect
  if (pathname === "/") {
    if (authCookie && roleCookie) {
      return NextResponse.redirect(new URL(ROLE_ROUTES[roleCookie] || "/admin", request.url));
    }
    return NextResponse.redirect(new URL("/login/hospital", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
