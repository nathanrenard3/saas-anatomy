'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

function sendToGoogleAnalytics({ name, delta, value, id, rating }: Metric) {
  // Utilisez `window.gtag` si vous avez configuré Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
      metric_rating: rating,
      non_interaction: true,
    })
  }

  // Log en développement pour voir les métriques
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      rating,
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    onCLS(sendToGoogleAnalytics)
    onFCP(sendToGoogleAnalytics)
    onINP(sendToGoogleAnalytics)
    onLCP(sendToGoogleAnalytics)
    onTTFB(sendToGoogleAnalytics)
  }, [])

  return null
}
