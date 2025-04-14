"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { deletePost, updatePost } from "@/lib/firestore";
import { useState } from "react";
import { PostData } from "@/types/post";

interface Props {
  post: PostData;
}

export default function PostDetail({ post }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const isAuthor = user?.email === post.author;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;
    await deletePost(post.id);
    router.push("/posts");
  };

  const handleUpdate = async () => {
    await updatePost(post.id, title, content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>글 수정</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={6}
        />
        <br />
        <button onClick={handleUpdate}>수정 완료</button>
        <button onClick={() => setIsEditing(false)}>취소</button>
      </div>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
        작성자: {post.author}
      </p>

      {isAuthor && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setIsEditing(true)}>✏ 수정</button>
          <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
            🗑 삭제
          </button>
        </div>
      )}
    </main>
  );
}
