import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "My Next.js App",
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
                page_path: window.location.pathname,
              });
            `
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
