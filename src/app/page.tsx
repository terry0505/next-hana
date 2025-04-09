"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/components/home.scss";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <main className="home-container">
      <h1>환영합니다!</h1>
      <p>게시글을 작성하거나 목록을 확인하세요.</p>
    </main>
  );
}
