"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const isInitialMount = useRef(true);
  const startTimeRef = useRef<number>(Date.now());
  const hasSentStayTime = useRef(false);

  useEffect(() => {
    const page_location = window.location.href;
    const page_title = document.title;
    const page_description =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement)
        ?.content || "";

    const sendStayTime = () => {
      if (hasSentStayTime.current) return;
      hasSentStayTime.current = true;

      const stayTime = Math.floor((Date.now() - startTimeRef.current) / 1000);

      navigator.sendBeacon(
        "/api/analytics",
        JSON.stringify({
          eventName: "stay_time",
          eventData: {
            page: prevPath.current,
            stay_time: stayTime,
            page_title,
            page_description
          }
        })
      );
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendStayTime();
    });
    window.addEventListener("beforeunload", sendStayTime);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (pathname === prevPath.current) {
      return;
    }

    prevPath.current = pathname;
    startTimeRef.current = Date.now();
    hasSentStayTime.current = false;

    // GA 전송
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location
      });
    }

    // Firestore 전송
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: "page_view",
        eventData: {
          page: pathname,
          page_location,
          page_title,
          page_description
        }
      })
    });

    return () => {
      sendStayTime();
    };
  }, [pathname]);

  return null;
}
