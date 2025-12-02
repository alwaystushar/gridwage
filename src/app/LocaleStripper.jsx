"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Purely client-side guard that normalises any `/en`, `/ar`, `/es` prefix
// back to the non-locale path. This lets you keep all logic in the frontend
// even if the hosting layer sends users to `/en` first.
export default function LocaleStripper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/");
    const first = segments[1];
    const supported = ["en", "ar", "es"];

    if (!supported.includes(first)) return;

    const newPath = "/" + segments.slice(2).join("/");
    router.replace(newPath === "//" ? "/" : newPath || "/");
  }, [pathname, router]);

  return children;
}


