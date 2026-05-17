"use client";

import { useEffect } from "react";

/** Keep refresh at page top unless the URL has a hash anchor. */
export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
