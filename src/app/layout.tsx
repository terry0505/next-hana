import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics";
import { Header } from "@/components/layout";
import "@/styles/globals.scss";
import "@toast-ui/editor/dist/toastui-editor.css";
import "toastr/build/toastr.min.css";

export const metadata: Metadata = {
  title: "Next.js + Firebase App",
  description: "Next.js + Firebase + GA 교육 자료"
};
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* GA 기본 스크립트 추가 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}', {
                send_page_view: false
              });
            `
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <GoogleAnalytics /> {/* 클라이언트 컴포넌트 추가 */}
      </body>
    </html>
  );
}
