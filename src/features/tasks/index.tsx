import { api } from "@/convex/_generated/api";

import { useQuery } from "convex/react";

import { CreateTaskButton } from "./components/create-task-button";
import { DataTable } from "./components/data-table";
import { DataTablePagination } from "./components/data-table-pagination";
import { PriorityFilter } from "./components/priority-filter";
import { QueryInput } from "./components/query-input";
import { StatusFilter } from "./components/status-filter";

export function TasksPage() {
  const data = useQuery(api.tasks.listTasks, {}) ?? [];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          List of your tasks filtered by status and sorted by date. you can
          modify it!!
        </p>
        <CreateTaskButton />
        <div className="flex flex-wrap items-center gap-3">
          <QueryInput fromN="/tasks" fromS="/_protected/tasks" />
          <StatusFilter />
          <PriorityFilter />
        </div>
      </div>
      <DataTable />
      <DataTablePagination totalCount={data.length} />
    </div>
  );
}
