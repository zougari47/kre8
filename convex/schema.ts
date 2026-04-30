import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    avatarStorageId: v.optional(v.id("_storage")),
    onBoardingCompleted: v.boolean(),
    updatedAt: v.optional(v.number()),
    isDeleted: v.boolean(),
  }).index("by_userId", ["userId"]),

  tasks: defineTable({
    title: v.string(),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(), // referencing userId from profiles or auth
  })
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .index("by_createdBy", ["createdBy"])
    .index("by_createdAt", ["createdAt"]),
});
