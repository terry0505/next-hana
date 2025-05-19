export interface AnalyticsEvent {
    eventName: 'page_view' | 'stay_time';
    timestamp:
      | {
          seconds: number;
        }
      | string;
    eventData: {
      page: string;
      stay_time?: number;
      page_title?: string;
      page_description?: string;
    };
  }