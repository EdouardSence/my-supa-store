import { NextResponse } from "next/server";
import { auth } from "@/auth";

const AB_COOKIE_NAME = "ab_group";

type AbGroup = "A" | "B";

function toAbGroup(value: string | null | undefined): AbGroup | null {
  if (!value) return null;
  const normalized = value.toUpperCase();
  return normalized === "A" || normalized === "B" ? normalized : null;
}

function pickAbGroup(): AbGroup {
  return Math.random() < 0.5 ? "A" : "B";
}

export default auth((request) => {
  const role = request.auth?.user?.role;
  const forcedByQuery = toAbGroup(request.nextUrl.searchParams.get("ab_prefetch"));
  const fromCookie = toAbGroup(request.cookies.get(AB_COOKIE_NAME)?.value);
  const abGroup = forcedByQuery ?? fromCookie ?? pickAbGroup();

  const response =
    request.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN"
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();

  response.cookies.set({
    name: AB_COOKIE_NAME,
    value: abGroup,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
