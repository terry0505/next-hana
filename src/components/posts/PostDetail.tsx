'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { deletePost } from '@/lib/firestore';
import { Post } from '@/types/post';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Viewer = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Viewer),
  { ssr: false }
);

interface Props {
  post: Post;
}

export default function PostDetail({ post }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const isAuthor = user?.email === post.author;

  const handleDelete = async () => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return;
    await deletePost(post.id);
    router.push('/posts');
  };

  return (
    <div className='post-detail'>
      <h1>{post.title}</h1>
      <div className='post-markdown'>
        <Viewer initialValue={post.content} />
      </div>
      <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
        작성자: {post.author}
      </p>

      {isAuthor && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => router.push(`/posts/${post.id}/update`)}>
            ✏ 수정
          </button>
          <button onClick={handleDelete} style={{ marginLeft: '1rem' }}>
            🗑 삭제
          </button>
        </div>
      )}
    </div>
  );
}