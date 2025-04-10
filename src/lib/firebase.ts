import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

//Firestore에 GA 이벤트 저장 함수 추가
export const logAnalyticsEvent = async (eventName: string, eventData: any) => {
  if (!analytics) return;

  logEvent(analytics, eventName, eventData); //GA에 이벤트 로깅
  try {
    // await addDoc(collection(db, "analytics"), {
    //   eventName,
    //   eventData,
    //   timestamp: new Date()
    // });
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ eventName, eventData })
    });
  } catch (error) {
    console.error("Firestore에 Analytics 데이터 저장 실패:", error);
  }
};
