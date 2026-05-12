import { TasksPage } from "@/features/tasks";
import { taskSearchSchema, type TaskSortId } from "@/features/tasks/types";
import { createFileRoute } from "@tanstack/react-router";

export type { TaskSortId };

export const Route = createFileRoute("/_protected/tasks")({
  validateSearch: taskSearchSchema,
  component: TasksPage,
});
