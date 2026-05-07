import { api } from "@/convex/_generated/api";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useQuery } from "convex/react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./columns";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTable() {
  // 1. Fetch data from Convex
  const data = useQuery(api.tasks.listTasks, {}) ?? [];

  // 2. Transform data memoized to prevent unnecessary recalculations

  // 2. Global search filter state
  // const [globalFilter, setGlobalFilter] = useState("");

  // 3. Wire up TanStack Table
  const table = useReactTable({
    data,
    columns,
    // state: { globalFilter },
    // onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data === undefined) {
    return <p className="text-4xl">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Search input */}
      {/* <Input */}
      {/*   placeholder="Search..." */}
      {/*   value={globalFilter} */}
      {/*   onChange={(e) => setGlobalFilter(e.target.value)} */}
      {/*   className="max-w-sm" */}
      {/* /> */}
      <DataTableViewOptions table={table} />

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table className="min-w-xl">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead
                    key={h.id}
                    className={cn(
                      "border border-red-200 py-2",
                      (h.column.columnDef.meta as Record<string, string>)
                        ?.className,
                    )}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-4",
                        "border border-red-200",
                        (cell.column.columnDef.meta as Record<string, string>)
                          ?.tdClassName,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
