import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const analyticsQuery = query(
      collection(db, "analytics"),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(analyticsQuery);

    const analyticsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Firestore에서 Analytics 데이터 가져오기 실패:", error);
    return NextResponse.json(
      { error: "데이터를 가져올 수 없습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { eventName, eventData } = await req.json();

    await addDoc(collection(db, "anaytics"), {
      eventName,
      eventData,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Firestore에 Analytics 데이터 저장 실패:", error);
    return NextResponse.json(
      { error: "데이터를 저장할 수 없습니다." },
      { status: 500 }
    );
  }
}
