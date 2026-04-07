import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const role = request.auth?.user?.role;

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
