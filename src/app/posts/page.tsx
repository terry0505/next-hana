import { PostList } from '@/components/posts';

export const metadata = {
  title: '글 목록 | Next.js + Firebase + GA',
  description: 'Next.js + Firebase + GA 글 목록 페이지입니다.',
};

export default function PostsPage() {
  return (
    <main>
      <PostList />
    </main>
  );
}