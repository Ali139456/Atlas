import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminPath } from "@/lib/admin/config";

export function middleware(request: NextRequest) {
  const adminPath = getAdminPath();
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === `/${adminPath}` || pathname.startsWith(`/${adminPath}/`)) {
    const suffix = pathname.slice(`/${adminPath}`.length) || "";
    const isLoginRoute = suffix === "" || suffix === "/";

    if (!isLoginRoute && !request.cookies.get(ADMIN_SESSION_COOKIE)?.value) {
      return NextResponse.redirect(new URL(`/${adminPath}`, request.url));
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/admin${suffix}`;
    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (pathname === "/api/preview/enable" || pathname === "/api/preview/disable") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
