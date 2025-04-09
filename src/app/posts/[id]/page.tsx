import { getPostById } from "@/lib/firestore";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.id);
  return {
    title: post?.title || "글 상세 | Next.js + Firebase + GA",
    description: post?.content?.slice(0, 50) || "게시글 상세 페이지입니다."
  };
}

export default async function PostDetailPage({ params }: Props) {
  const post = await getPostById(params.id);

  if (!post) return notFound();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
        작성자: {post.author}
      </p>
    </main>
  );
}
