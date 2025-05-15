"use client";

import { useEffect, useState } from "react";
import { subscribeToPosts, deletePost } from "@/lib/firestore";
import "@/styles/components/posts.scss";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function PostList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPosts(setPosts);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePost(id);
  };

  const cleanedStr = (str: string) =>
    str
      .replace(/!\[.*?\]\(.*?\)/g, "") // 마크다운 이미지 제거
      .replace(/\n+/g, " ") // 줄바꿈을 공백으로 변경
      .trim();

  return (
    <div className="post-list">
      <h2>게시글 목록</h2>
      <div className="post-item-wrap">
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <Link href={`/posts/${post.id}`}>
                <div className="thumbnail-title">
                  <div className="thumbnail-area">
                    <img
                      src={post.thumbnailUrl || "/next.svg"}
                      alt="썸네일"
                      className="thumbnail"
                    />
                  </div>
                  <div className="text-preview">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{cleanedStr(post.content)}</p>
                  </div>
                </div>
              </Link>
              <p className="author">작성자: {post.author}</p>
              {user && user.email === post.author && (
                <div className="post-btns">
                  <Link href={`/posts/${post.id}/update`}>
                    <button>수정</button>
                  </Link>
                  <button onClick={() => handleDelete(post.id)}>삭제</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
