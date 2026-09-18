/**
 * Google Analytics 4 (GA4) Event Dispatcher
 * Tracks interactive tool submissions, conversions, and navigation events.
 */

export interface ToolUsageEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

export const trackToolUsage = (
  toolName: string,
  action: string,
  extraParams?: Record<string, any>
) => {
  try {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', action, {
        event_category: 'Free Tool',
        event_label: toolName,
        value: 1,
        tool_name: toolName,
        timestamp: new Date().toISOString(),
        ...extraParams,
      });
    } else if (process.env.NODE_ENV !== 'production') {
      // Development console debugging
      console.log(`[GA4 Event] ${action} -> Tool: ${toolName}`, extraParams);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to dispatch tool usage event:', err);
  }
};
