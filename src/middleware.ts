import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const supabaseAuthCookie = request.cookies
    .getAll()
    .find((cookie) => cookie.name.includes("auth-token"));
  if (!supabaseAuthCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};