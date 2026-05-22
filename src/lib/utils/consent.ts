export type ConsentStatus = 'accepted' | 'rejected' | 'pending';

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  
  const consent = localStorage.getItem('posthog_consent');
  if (consent === 'true') return 'accepted';
  if (consent === 'false') return 'rejected';
  return 'pending';
}

export function isTrackingAllowed(): boolean {
  return getConsentStatus() === 'accepted';
}

export function setConsent(accepted: boolean): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('posthog_consent', accepted.toString());
  
  window.dispatchEvent(new CustomEvent('consentChange', {
    detail: { accepted, status: accepted ? 'accepted' : 'rejected' }
  }));
}

export function resetConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('posthog_consent');
  window.dispatchEvent(new CustomEvent('consentChange', {
    detail: { accepted: null, status: 'pending' }
  }));
}

export async function trackWithConsent(eventName: string, properties?: Record<string, any>): Promise<void> {
  if (!isTrackingAllowed()) {
    console.log(`Tracking skipped for ${eventName} - no consent`);
    return;
  }
  
  try {
    const { default: posthog } = await import('posthog-js');
    posthog.capture(eventName, properties);
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}

export async function identifyWithConsent(distinctId: string, properties?: Record<string, any>): Promise<void> {
  if (!isTrackingAllowed()) {
    console.log(`Identification skipped for ${distinctId} - no consent`);
    return;
  }
  
  try {
    const { default: posthog } = await import('posthog-js');
    posthog.identify(distinctId, properties);
  } catch (error) {
    console.error('Identification failed:', error);
  }
}
