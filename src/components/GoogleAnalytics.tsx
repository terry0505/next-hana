"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    //최초 로딩일 경우 한 번만 실행 (초기 mount)
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (pathname === prevPath.current) {
      return; //중복 방지
    }

    prevPath.current = pathname;

    const page_location = window.location.href;

    //1. GA 전송
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location
      });
    }
    //2. Firestore 저장
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: "page_view",
        eventData: {
          page: pathname,
          page_location
        }
      })
    });
  }, [pathname]);

  return null;
}
