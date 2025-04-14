"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addPost } from "@/lib/firestore";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/components/posts.scss";

export default function AddPostForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await addPost(title, content, user.email || "익명");
      setTitle("");
      setContent("");
      setError("");
      alert("게시글이 추가되었습니다!");
      router.push("/posts");
    } catch (err) {
      setError("게시글 추가 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className="post-form-container">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">게시글 등록</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
