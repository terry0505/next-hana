// 고정된 페이지 순서
export const PAGE_ORDER = ["/", "/posts", "/post/write"];

// 라벨도 함께 정의해두면 chart나 table에서도 재사용 가능
export const PAGE_LABELS: Record<string, string> = {
  "/": "메인 (/)",
  "/posts": "글목록 (/posts)",
  "/post/write": "글작성 (/post/write)"
};
