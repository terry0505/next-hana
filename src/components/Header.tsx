"use client";
import { useAuth } from "@/hooks/useAuth";
import { logOut } from "@/lib/auth";
import Link from "next/link";
import "@/styles/components/header.scss";

export default function Header() {
  const { user, loading } = useAuth();
  return (
    <header>
      <h1>
        <Link href="/">Next.js + Firebase + GA 교육 자료</Link>
      </h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : user ? (
        <div className="user-info">
          <Link href="/post/write">글 작성</Link>
          <Link href="/posts">글 목록</Link>
          <p>환영합니다, {user.displayName || user.email}!</p>
          <button onClick={logOut}>로그아웃</button>
        </div>
      ) : (
        <nav>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </nav>
      )}
    </header>
  );
}
