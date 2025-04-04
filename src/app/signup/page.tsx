"use client";

import SignUpForm from "@/components/SignUpForm";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signInWithGitHub } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div>
      <h2>회원가입 페이지</h2>
      <SignUpForm />
      <button onClick={signInWithGoogle}>Google 회원가입/로그인</button>
      <button onClick={signInWithGitHub}>GitHub 회원가입/로그인</button>
    </div>
  );
}
