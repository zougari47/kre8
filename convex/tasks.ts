import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

// Helper to require authentication
async function requireAuth(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated: must be logged in");
  }
  return identity;
}

// Create a new task
export const createTask = mutation({
  args: {
    title: v.string(),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const now = Date.now();
    const taskId = await ctx.db.insert("tasks", {
      ...args,
      createdBy: identity.subject, // unique user identifier
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(taskId);
  },
});

// Get a task by ID
export const getTask = query({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    return await ctx.db.get(args.id);
  },
});

// List tasks with optional filtering
export const listTasks = query({
  args: {
    status: v.optional(
      v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
    ),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    ),
    createdBy: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { status, priority, createdBy, limit }) => {
    await requireAuth(ctx);

    const cap = limit ?? 50;

    // Use withIndex for the primary filter, then post-filter in memory for the rest
    // (Convex only supports one withIndex per query)
    if (status !== undefined) {
      const results = await ctx.db
        .query("tasks")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .collect();

      return results
        .filter((t) =>
          priority !== undefined ? t.priority === priority : true,
        )
        .filter((t) =>
          createdBy !== undefined ? t.createdBy === createdBy : true,
        )
        .slice(0, cap);
    }

    if (priority !== undefined) {
      const results = await ctx.db
        .query("tasks")
        .withIndex("by_priority", (q) => q.eq("priority", priority))
        .order("desc")
        .collect();

      return results
        .filter((t) =>
          createdBy !== undefined ? t.createdBy === createdBy : true,
        )
        .slice(0, cap);
    }

    if (createdBy !== undefined) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_createdBy", (q) => q.eq("createdBy", createdBy))
        .order("desc")
        .take(cap);
    }

    return await ctx.db.query("tasks").order("desc").take(cap);
  },
});

// Update a task
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    status: v.optional(
      v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
    ),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    ),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    const { id, ...fields } = args;

    await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

// Delete a task
export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Mark task as complete
export const completeTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    await ctx.db.patch(args.id, {
      status: "done",
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});
