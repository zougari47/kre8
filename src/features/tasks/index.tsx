import { CreateTaskButton } from "./components/create-task-button";
import { DataTable } from "./components/data-table";

export function TasksPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          List of your tasks filtered by status and sorted by date. you can
          modify it!!
        </p>
        <CreateTaskButton />
      </div>
      <DataTable />
    </div>
  );
}
