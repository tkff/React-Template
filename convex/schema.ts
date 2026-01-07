/**
 * Convex Database Schema
 *
 * To enable Convex:
 * pnpm add convex
 * npx convex dev
 *
 * @ts-nocheck - This file is only used when Convex is installed
 */
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Example: Tasks table
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
    createdAt: v.number(),
  }).index('by_completed', ['completed']),

  // Add more tables as needed
  // users: defineTable({
  //   name: v.string(),
  //   email: v.string(),
  // }).index('by_email', ['email']),
});
