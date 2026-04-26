import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    avatarUrl: v.optional(v.string()),
    onBoardingCompleted: v.boolean(),
    updatedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),
});
