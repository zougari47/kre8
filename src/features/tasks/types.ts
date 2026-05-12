import { api } from "@/convex/_generated/api";
import z from "zod";

import type { FunctionReturnType } from "convex/server";

export type Task = FunctionReturnType<typeof api.tasks.listTasks>[number];
export type Status = Task["status"];
export type Priority = Task["priority"];

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const taskSearchSchema = z.object({
  offset: z.number().optional().catch(1),
  limit: z.number().optional().catch(10),
  q: z.string().optional(),
  status: z.array(z.enum(TASK_STATUSES)).optional().catch(undefined),
  priority: z.array(z.enum(TASK_PRIORITIES)).optional().catch(undefined),
  sort: z
    .array(
      z.object({
        id: z.enum(["title", "status", "priority", "_creationTime"]),
        desc: z.boolean().default(false),
      }),
    )
    .optional()
    .catch(undefined),
});

// Derive sort id type from schema. single source of truth
type TaskSort = z.infer<typeof taskSearchSchema>["sort"];
export type TaskSortId = Exclude<TaskSort, undefined>[number]["id"];
