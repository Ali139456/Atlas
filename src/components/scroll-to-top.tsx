"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string, behavior: ScrollBehavior = "auto") {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** Scroll to top on route change, or to hash targets for in-page / cross-page anchors. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const run = () => scrollToHash(hash);
      run();
      const retry = window.setTimeout(run, 120);
      return () => window.clearTimeout(retry);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, "smooth");
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
