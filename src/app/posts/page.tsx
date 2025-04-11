import PostList from "@/components/PostList";

export const metadata = {
  title: "글 목록 | Next.js + Firebase + GA",
  description: "Next.js + Firebase + GA 글 목록 페이지입니다."
};

export default function PostPage() {
  return (
    <main>
      <h1>게시글 목록</h1>
      <PostList />
    </main>
  );
}
