import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!gaId) {
    console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not defined')
    return null
  }

  return <NextGoogleAnalytics gaId={gaId} />
}
