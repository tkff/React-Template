import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

/**
 * Initialize Sentry error tracking
 *
 * To enable Sentry:
 * 1. Create a project at https://sentry.io
 * 2. Add VITE_SENTRY_DSN to your .env file
 *
 * Sentry will automatically capture:
 * - Unhandled exceptions
 * - Unhandled promise rejections
 * - Console errors (optional)
 */
export function initSentry() {
  if (!SENTRY_DSN) {
    if (import.meta.env.DEV) {
      console.info(
        '[Sentry] DSN not configured. Set VITE_SENTRY_DSN in .env to enable error tracking.'
      );
    }
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    enabled: import.meta.env.PROD, // Only enable in production by default

    // Performance monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring

    // Session replay for debugging (optional - increases bundle size)
    // replaysSessionSampleRate: 0.1,
    // replaysOnErrorSampleRate: 1.0,

    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Network errors that are usually not actionable
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      // User aborted requests
      'AbortError',
      // Resize observer errors (common, usually harmless)
      'ResizeObserver loop',
    ],

    // Add custom context
    beforeSend(event) {
      // Don't send events in development
      if (import.meta.env.DEV) {
        console.warn('[Sentry] Would send event:', event);
        return null;
      }
      return event;
    },
  });
}

/**
 * Capture a custom error with additional context
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  if (!SENTRY_DSN) return;

  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capture a custom message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (!SENTRY_DSN) return;

  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

// Re-export Sentry's ErrorBoundary for convenience
export { ErrorBoundary } from '@sentry/react';
