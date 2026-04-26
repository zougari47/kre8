import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getProfile = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return null;

    return await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

export const updateProfile = mutation({
  args: {
    userId: v.string(),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    onBoardingCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!profile) throw new Error("Profile not found");

    const { ...fields } = args;

    await ctx.db.patch(profile._id, fields);
  },
});

export const completeOnboarding = mutation({
  args: {
    userId: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, {
      username: args.username,
      bio: args.bio,
      onBoardingCompleted: true,
      updatedAt: Date.now(),
    });
  },
});
