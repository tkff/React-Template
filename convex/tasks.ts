/**
 * Example Convex Functions
 *
 * To enable Convex:
 * pnpm add convex
 * npx convex dev
 *
 * @ts-nocheck - This file is only used when Convex is installed
 */
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Query: List all tasks
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').order('desc').collect();
  },
});

// Query: Get tasks by completion status
export const listByStatus = query({
  args: { completed: v.boolean() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('tasks')
      .withIndex('by_completed', (q) => q.eq('completed', args.completed))
      .collect();
  },
});

// Mutation: Create a new task
export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tasks', {
      title: args.title,
      description: args.description,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

// Mutation: Toggle task completion
export const toggle = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error('Task not found');

    await ctx.db.patch(args.id, { completed: !task.completed });
  },
});

// Mutation: Delete a task
export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
