import { NextResponse } from "next/server";

// Proxy equivalent of the old middleware:
// Strip /en, /ar, /es prefixes so /en -> / and /en/pricing -> /pricing
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/(en|ar|es)(\/.*)?$/);
  if (!match) {
    return NextResponse.next();
  }

  const newPath = match[2] || "/";
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};


