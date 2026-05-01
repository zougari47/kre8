import { api } from "@/convex/_generated/api";
import { ColumnDef } from "@tanstack/react-table";

import { FunctionReturnType } from "convex/server";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./column-header";

type Task = FunctionReturnType<typeof api.tasks.listTasks>[number];

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => row.original._id.toString().slice(0, 6),
  },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const value = row.original.priority;
      const variant =
        value === "high"
          ? "destructive"
          : value === "low"
            ? "ghost"
            : "default";
      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    accessorKey: "_creationTime",
    header: "Creation Date",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];
