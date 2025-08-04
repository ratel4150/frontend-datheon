export {}

declare global {
  interface Window {
    fbq?: (
      event: string,
      action?: string,
      options?: Record<string, unknown>
    ) => void

    dataLayer: Array<Record<string, unknown>>
  }
}
