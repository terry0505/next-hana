"use client";

import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { PAGE_ORDER, PAGE_LABELS } from "@/constants/page";

interface AnalyticsRow {
  eventName: "stay_time" | "page_view";
  eventData: {
    page: string;
    stay_time?: number;
  };
}

interface Props {
  data: AnalyticsRow[];
}

const PAGE_LABELS: Record<string, string> = {
  "/": "메인 (/)",
  "/posts": "글목록(/posts)",
  "/post/write": "글작성 (/post/write)"
};

export default function EChartBar({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    //데이터 분리
    const stayTimeByPage: Record<string, number[]> = {};
    const pageViewCounts: Record<string, number> = {};

    data.forEach((row) => {
      const page = row.eventData.page;
      if (!page) return;

      if (row.eventName === "stay_time") {
        const time = row.eventData.stay_time || 0;
        if (!stayTimeByPage[page]) stayTimeByPage[page] = [];
        stayTimeByPage[page].push(time);
      }

      if (row.eventName === "page_view") {
        if (!pageViewCounts[page]) pageViewCounts[page] = 0;
        pageViewCounts[page]++;
      }
    });
    const pages = PAGE_ORDER.filter(
      (page) => stayTimeByPage[page] || pageViewCounts[page]
    );

    const viewCounts = pages.map((page) => pageViewCounts[page] || 0);

    chart.setOption({
      title: {
        text: "페이지별 체류시간 & 페이지뷰 수",
        left: "center"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["평균 체류시간 (초)", "페이지뷰 수"],
        top: 30
      },
      xAxis: {
        type: "category",
        data: labels,
        axisLabel: {
          rotate: 20
        }
      },
      yAxis: [
        {
          type: "value",
          name: "체류시간 (초)"
        },
        {
          type: "value",
          name: "페이지뷰 수"
        }
      ],
      series: [
        {
          name: "평균 체류시간 (초)",
          type: "bar",
          data: avgStayTimes,
          barWidth: "15%",
          itemStyle: { color: "#5B8FF9" }
        },
        {
          name: "페이지뷰 수",
          type: "line",
          yAxisIndex: 1,
          data: viewCounts,
          itemStyle: { color: "#FF9900" }
        }
      ]
    });
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "440px" }} />;
}
