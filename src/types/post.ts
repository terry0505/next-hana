import { Timestamp } from 'firebase/firestore';

type BasePost = {
  title: string;
  content: string;
  author: string;
  thumbnailUrl: string;
};

export interface Post extends BasePost {
  id: string;
  createdAt: number | null;
  updatedAt: number | null;
}

export interface FirestorePost extends BasePost {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}