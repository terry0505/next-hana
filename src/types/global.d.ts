export {};

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetIdOrEventName: string,
      config?: {
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
  }
}
