"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function isReload() {
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    return nav?.type === "reload";
  } catch {
    return false;
  }
}

function toTop() {
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
}

function toHash(hash: string, behavior: ScrollBehavior = "auto") {
  const id = hash.replace(/^#/, "");
  if (!id || id === "top") {
    toTop();
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export function ScrollToTop() {
  const pathname = usePathname();
  const pinReload = useRef(isReload());

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (pinReload.current) {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
      toTop();
      const t = window.setTimeout(() => {
        pinReload.current = false;
        document.documentElement.classList.add("is-ready-scroll");
      }, 400);
      return () => window.clearTimeout(t);
    }

    document.documentElement.classList.add("is-ready-scroll");
    const hash = window.location.hash;
    if (hash && hash !== "#" && hash !== "#top") {
      toHash(hash);
      return;
    }
    toTop();
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      if (pinReload.current) {
        toTop();
        return;
      }
      if (location.hash && location.hash !== "#top") toHash(location.hash, "smooth");
      else toTop();
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return null;
}
