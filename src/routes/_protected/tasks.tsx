import { CreateTaskButton } from "@/features/components/create-task-button";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const taskSearchSchema = z.object({
  page: z.number().optional().catch(1),
});

export const Route = createFileRoute("/_protected/tasks")({
  validateSearch: taskSearchSchema,
  component: CreateTaskButton,
});
