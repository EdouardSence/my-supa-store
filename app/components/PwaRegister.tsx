"use client";

import { useEffect } from "react";

export default function PwaRegister(): null {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => {
        console.error("[PWA] SW registration failed", error);
      });
  }, []);

  return null;
}
