import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/admin", "/doctor", "/receptionist", "/patient", "/lab"];
const AUTH_PATHS = ["/login", "/register"];

const ROLE_ROUTES: Record<string, string> = {
  HospitalAdmin:  "/admin",
  Doctor:         "/doctor",
  Receptionist:   "/receptionist",
  Patient:        "/patient",
  LabTechnician:  "/lab",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("hms-token")?.value;
  const role  = request.cookies.get("hms-role")?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPath  = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (pathname === "/") {
    if (token && role) return NextResponse.redirect(new URL(ROLE_ROUTES[role] ?? "/admin", request.url));
    return NextResponse.redirect(new URL("/login/hospital", request.url));
  }
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login/hospital", request.url));
  }
  if (isAuthPath && token && role) {
    return NextResponse.redirect(new URL(ROLE_ROUTES[role] ?? "/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
