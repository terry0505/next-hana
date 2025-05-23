import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { FirestorePost, Post } from '@/types/post';

function extractThumbnailFromMarkdown(content: string): string {
  const match = content.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : '';
}

// 게시글 추가 (Create)
export const addPost = async (
  title: string,
  content: string,
  author: string
) => {
  try {
    const thumbnailUrl = extractThumbnailFromMarkdown(content);

    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      author,
      thumbnailUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('게시글 추가 오류:', error);
    throw error;
  }
};

// 모든 게시글 조회 (Read)
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    throw error;
  }
};

export async function getPostById(id: string): Promise<Post | null> {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  return {
    id: docSnap.id,
    title: data.title,
    content: data.content,
    author: data.author,
    thumbnailUrl: data.thumbnailUrl,
    createdAt: data.createdAt?.seconds || null,
    updatedAt: data.updatedAt?.seconds || null,
  };
}

// 게시글 실시간 구독 (Read + Real-time)
export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  const postsQuery = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(postsQuery, (snapshot: QuerySnapshot) => {
    const updatedPosts: Post[] = snapshot.docs.map((doc) => {
      const data = doc.data() as FirestorePost;

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
        thumbnailUrl: data.thumbnailUrl,
        createdAt: data.createdAt?.seconds ?? null,
        updatedAt: data.updatedAt?.seconds ?? null,
      };
    });

    callback(updatedPosts);
  });
};

// 게시글 수정 (Update)
export const updatePost = async (
  id: string,
  title: string,
  content: string
) => {
  try {
    const postRef = doc(db, 'posts', id);
    const thumbnailUrl = extractThumbnailFromMarkdown(content);
    await updateDoc(postRef, {
      title,
      content,
      thumbnailUrl,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    throw error;
  }
};

// 게시글 삭제 (Delete)
export const deletePost = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    throw error;
  }
};