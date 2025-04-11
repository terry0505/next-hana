"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { formatTimestamp } from "@/utils";

import "@/styles/components/home.scss";

export default function Home() {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("GA 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="home-page">
        <p className="loading">로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="home-page">
      <h1>📊 페이지 체류 시간</h1>
      <table>
        <thead>
          <tr>
            <th>페이지</th>
            <th>체류 시간</th>
            <th>타이틀</th>
            <th>Description</th>
            <th>시간</th>
          </tr>
        </thead>
        <tbody>
          {analytics
            .filter((a) => a.eventName === "stay_time")
            .map((row, index) => (
              <tr key={index}>
                <td>{row.eventData.page}</td>
                <td>{row.eventData.stay_time}초</td>
                <td>{row.eventData.page_title}</td>
                <td>{row.eventData.page_description}</td>
                <td>{formatTimestamp(row.timestamp)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
