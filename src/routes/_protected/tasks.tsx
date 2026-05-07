import { TasksPage } from "@/features/tasks";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const taskSearchSchema = z.object({
  page: z.number().optional().catch(1),
  q: z.string().optional(),
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

export const Route = createFileRoute("/_protected/tasks")({
  validateSearch: taskSearchSchema,
  component: TasksPage,
});
