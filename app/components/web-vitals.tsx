"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals(): null {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return null;
}
