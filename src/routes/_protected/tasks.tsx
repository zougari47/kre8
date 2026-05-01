import { TasksPage } from "@/features/tasks";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const taskSearchSchema = z.object({
  page: z.number().optional().catch(1),
  q: z.string().optional(),
});

export const Route = createFileRoute("/_protected/tasks")({
  validateSearch: taskSearchSchema,
  component: TasksPage,
});
