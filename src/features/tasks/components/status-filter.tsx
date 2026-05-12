import * as React from "react";

import { api } from "@/convex/_generated/api";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Check,
  Circle,
  CircleCheck,
  CircleHelp,
  CirclePlus,
} from "lucide-react";

import { useQuery } from "convex/react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { type Status, TASK_STATUSES } from "../types";

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  todo: { label: "Todo", icon: Circle },
  in_progress: { label: "In Progress", icon: CircleHelp },
  done: { label: "Done", icon: CircleCheck },
};

export function StatusFilter() {
  const navigate = useNavigate({ from: "/tasks" });
  const { status: selectedStatuses = [] } = useSearch({
    from: "/_protected/tasks",
  });

  const allTasks = useQuery(api.tasks.listTasks, {});

  const counts = React.useMemo(() => {
    const initialCounts = TASK_STATUSES.reduce(
      (acc, s) => ({ ...acc, [s]: 0 }),
      {} as Record<Status, number>,
    );

    return (allTasks ?? []).reduce((acc, t) => {
      acc[t.status]++;
      return acc;
    }, initialCounts);
  }, [allTasks]);

  function toggleStatus(s: Status) {
    const next = selectedStatuses.includes(s)
      ? selectedStatuses.filter((item) => item !== s)
      : [...selectedStatuses, s];

    void navigate({
      search: (prev) => ({
        ...prev,
        status: next.length > 0 ? next : undefined,
      }),
    });
  }

  function clearFilters() {
    void navigate({
      search: (prev) => ({
        ...prev,
        status: undefined,
      }),
    });
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed px-3"
          >
            <CirclePlus className="mr-2 size-4" />
            Status
            {selectedStatuses.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedStatuses.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedStatuses.length > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedStatuses.length} selected
                    </Badge>
                  ) : (
                    selectedStatuses.map((s) => (
                      <Badge
                        variant="secondary"
                        key={s}
                        className="rounded-sm px-1 font-normal"
                      >
                        {STATUS_CONFIG[s].label}
                      </Badge>
                    ))
                  )}
                </div>
              </>
            )}
          </Button>
        }
      />
      <PopoverContent align="start" className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Status" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {TASK_STATUSES.map((s) => {
                const isSelected = selectedStatuses.includes(s);
                const Icon = STATUS_CONFIG[s].icon;
                return (
                  <CommandItem
                    key={s}
                    onSelect={() => toggleStatus(s)}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-lg border-[1.5px] transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/40 bg-transparent",
                      )}
                    >
                      {isSelected && (
                        <Check className="size-3 stroke-[2.5] text-primary-foreground" />
                      )}
                    </div>
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="flex-1">{STATUS_CONFIG[s].label}</span>
                    <span className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {counts[s]}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedStatuses.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearFilters}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
