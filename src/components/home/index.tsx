"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import EChartBar from "@/components/charts/EChartBar";
import { formatTimestamp } from "@/utils";
import { PAGE_ORDER } from "@/constants/page";

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

  // 🔢 페이지별 통계 집계
  const pageStats: Record<
    string,
    {
      stayTimes: number[];
      views: number;
      title?: string;
      description?: string;
      lastSeen?: string;
    }
  > = {};

  analytics.forEach((row: any) => {
    const page = row.eventData?.page;
    if (!page) return;

    if (!pageStats[page]) {
      pageStats[page] = {
        stayTimes: [],
        views: 0
      };
    }

    if (row.eventName === "stay_time") {
      pageStats[page].stayTimes.push(row.eventData.stay_time || 0);
      pageStats[page].title = row.eventData.page_title || "";
      pageStats[page].description = row.eventData.page_description || "";

      const currentLastSeen = pageStats[page].lastSeen;
      const newTimestamp =
        row.timestamp && typeof row.timestamp.seconds === "number"
          ? new Date(row.timestamp.seconds * 1000)
          : new Date(row.timestamp);

      const newLastSeen = formatTimestamp(newTimestamp);

      if (
        !currentLastSeen ||
        new Date(newLastSeen).getTime() > new Date(currentLastSeen).getTime()
      ) {
        pageStats[page].lastSeen = newLastSeen;
      }
    }

    if (row.eventName === "page_view") {
      pageStats[page].views++;
    }
  });

  const rows = PAGE_ORDER.map(
    (page) =>
      [page, pageStats[page]] as [
        string,
        NonNullable<(typeof pageStats)[string]>
      ]
  ).filter(([, stat]) => !!stat);

  return (
    <main className="home-page">
      <h1>📊 페이지 체류 시간</h1>
      <EChartBar data={analytics} />
      <table>
        <thead>
          <tr>
            <th>페이지</th>
            <th>평균 체류 시간</th>
            <th>페이지뷰 수</th>
            <th>타이틀</th>
            <th>Description</th>
            <th>최근 접속 시간</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([page, stat], index) => {
            const avgStay =
              stat.stayTimes.length > 0
                ? Math.round(
                    stat.stayTimes.reduce((a, b) => a + b, 0) /
                      stat.stayTimes.length
                  )
                : 0;

            return (
              <tr key={index}>
                <td>{page}</td>
                <td>{avgStay}초</td>
                <td>{stat.views}</td>
                <td>{stat.title}</td>
                <td>{stat.description}</td>
                <td>{stat.lastSeen}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
