import AddPostForm from "@/components/AddPostForm";

export const metadata = {
  title: "글 작성 | Next.js + Firebase + GA",
  description: "Next.js + Firebase + GA 글 작성 페이지입니다."
};

export default function WritePostPage() {
  return (
    <main>
      <h1>게시글 작성</h1>
      <AddPostForm />
    </main>
  );
}
