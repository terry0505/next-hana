import Home from "@/components/Home";

export const metadata = {
  title: "홈 | Next.js + Firebase + GA",
  description:
    "Next.js + Firebase + GA 메인 페이지입니다. GA 데이터를 확인해보세요.",
  keywords: ["블로그", "Next.js", "Google Analytics", "Firebase"],
  authors: [{ name: "박하나" }],
  openGraph: {
    title: "홈 | Next.js + Firebase + GA",
    description:
      "Next.js + Firebase + GA 메인 페이지입니다. GA 데이터를 확인해보세요.",
    url: "http://localhost:3000",
    siteName: "내 블로그",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "내 블로그 대표 이미지"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "홈 | Next.js + Firebase + GA",
    description:
      "Next.js + Firebase + GA 메인 페이지입니다. GA 데이터를 확인해보세요.",
    images: ["/og-image.png"]
  },
  metadataBase: new URL("http://localhost:3000")
};

export default function HomePage() {
  return <Home />;
}
