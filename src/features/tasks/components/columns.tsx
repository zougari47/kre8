import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Task } from "../types";
import { DataTableColumnHeader } from "./column-header";

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
    cell: ({ row }) => (
      <div className="w-20">{row.original._id.toString().slice(0, 6)}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    meta: {
      className: "px-2",
      tdClassName: "px-2",
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    meta: { className: "px-2", tdClassName: "px-2" },
  },

  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    meta: { className: "px-2", tdClassName: "px-2" },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    meta: { className: "px-2", tdClassName: "px-2" },
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];
