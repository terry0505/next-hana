"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById } from "@/lib/firestore";
import EditPostForm from "@/components/posts/EditPostForm";

export default function PostUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id as string);
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return <EditPostForm post={post} onCancel={() => router.push("/posts")} />;
}
