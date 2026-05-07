import { useNavigate, useSearch } from "@tanstack/react-router";
import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { TaskSortId } from "@/routes/_protected/tasks";

type DataTableColumnHeaderProps<TData, TValue> =
  React.HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const navigate = useNavigate({ from: "/tasks" });
  const search = useSearch({ from: "/_protected/tasks" });

  const handleSort = (desc: boolean) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        sort: [{ id: column.id as TaskSortId, desc }],
      }),
    });
  };

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortEntry = search.sort?.find((s) => s.id === column.id);
  const isSorted = sortEntry ? (sortEntry.desc ? "desc" : "asc") : false;

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2.5 h-8 data-open:bg-accent"
            >
              <span>{title}</span>
              {isSorted === "desc" ? (
                <ArrowDown className="ms-2 h-4 w-4" />
              ) : sortEntry ? (
                <ArrowUp className="ms-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ms-2 h-4 w-4" />
              )}
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort(false)}>
            <ArrowUp className="size-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort(true)}>
            <ArrowDown className="size-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="size-3.5 text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
