/**
 * Utility functions for managing GDPR cookie consent
 */

export type ConsentStatus = 'accepted' | 'rejected' | 'pending';

/**
 * Get the current consent status
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  
  const consent = localStorage.getItem('posthog_consent');
  if (consent === 'true') return 'accepted';
  if (consent === 'false') return 'rejected';
  return 'pending';
}

/**
 * Check if analytics tracking is allowed
 */
export function isTrackingAllowed(): boolean {
  return getConsentStatus() === 'accepted';
}

/**
 * Set consent status
 */
export function setConsent(accepted: boolean): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('posthog_consent', accepted.toString());
  
  // Dispatch custom event for components to listen to
  window.dispatchEvent(new CustomEvent('consentChange', {
    detail: { accepted, status: accepted ? 'accepted' : 'rejected' }
  }));
}

/**
 * Reset consent (for testing or user preference changes)
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('posthog_consent');
  window.dispatchEvent(new CustomEvent('consentChange', {
    detail: { accepted: null, status: 'pending' }
  }));
}

/**
 * Track event with consent check
 */
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

/**
 * Identify user with consent check
 */
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
