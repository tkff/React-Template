/**
 * Convex Provider
 *
 * To enable Convex:
 * 1. pnpm add convex
 * 2. npx convex dev
 * 3. Uncomment the ConvexProvider in App.tsx
 *
 * @ts-nocheck - This file is only used when Convex is installed
 */
import { type ReactNode } from 'react';
import { ConvexProvider as BaseConvexProvider, ConvexReactClient } from 'convex/react';

// Initialize the Convex client
// The VITE_CONVEX_URL is set automatically by `npx convex dev`
const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  console.warn('VITE_CONVEX_URL is not set. Run `npx convex dev` to initialize Convex.');
}

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

interface ConvexProviderProps {
  children: ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  if (!convex) {
    // Return children without provider if Convex is not configured
    return <>{children}</>;
  }

  return <BaseConvexProvider client={convex}>{children}</BaseConvexProvider>;
}
