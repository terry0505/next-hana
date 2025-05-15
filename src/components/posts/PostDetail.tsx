"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { deletePost, updatePost } from "@/lib/firestore";
import { useState } from "react";
import { PostData } from "@/types/post";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false }
);

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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
        작성자: {post.author}
      </p>

      {isAuthor && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => router.push(`/posts/${post.id}/update`)}>
            ✏ 수정
          </button>
          <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
            🗑 삭제
          </button>
        </div>
      )}
    </main>
  );
}
