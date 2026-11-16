import { useCallback, useEffect, useState } from 'react';

export type ConsentChoice = 'all' | 'essential' | null;
const CONSENT_STORAGE_KEY = 'prida_cookie_consent_v1';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
  }
}

function applyGoogleConsentSignals(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;
  const granted = choice === 'all';

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
    });
  }

  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = granted ? 0 : 1;
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved === 'all' || saved === 'essential') return saved;
    } catch {}
    return null;
  });
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    if (consent) {
      applyGoogleConsentSignals(consent);
      setBannerOpen(false);
    } else {
      const timer = window.setTimeout(() => setBannerOpen(true), 800);
      return () => window.clearTimeout(timer);
    }
  }, [consent]);

  const saveConsent = useCallback((choice: Exclude<ConsentChoice, null>) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {}
    setConsent(choice);
    applyGoogleConsentSignals(choice);
    setBannerOpen(false);
  }, []);

  return {
    consent,
    bannerOpen,
    saveConsent,
    reopenPreferences: () => setBannerOpen(true),
  };
}
