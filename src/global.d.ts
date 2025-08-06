// src\global.d.ts
export {}

declare global {
  interface Window {
    // Facebook Pixel
    fbq?: (
      event: string,
      action?: string,
      options?: Record<string, unknown>
    ) => void

    // Google Tag Manager
    dataLayer: Array<Record<string, unknown>>
    
    // Google Analytics (gtag.js)
    gtag?: (
      method: 'event' | 'config' | 'set' | 'get',
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void
  }
}