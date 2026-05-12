import * as React from "react";

import { DataTableFacetedFilter } from "@/components/shared/data-table-faceted-filter";
import { api } from "@/convex/_generated/api";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import { useQuery } from "convex/react";

import { type Priority, TASK_PRIORITIES } from "../types";

const PRIORITY_OPTIONS: {
  label: string;
  value: Priority;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: "Low", value: "low", icon: ArrowDown },
  { label: "Medium", value: "medium", icon: ArrowRight },
  { label: "High", value: "high", icon: ArrowUp },
];

export function PriorityFilter() {
  const navigate = useNavigate({ from: "/tasks" });
  const { priority: selectedPriorities = [] } = useSearch({
    from: "/_protected/tasks",
  });

  const allTasks = useQuery(api.tasks.listTasks, {});

  const counts = React.useMemo(() => {
    const initialCounts = TASK_PRIORITIES.reduce(
      (acc, p) => ({ ...acc, [p]: 0 }),
      {} as Record<Priority, number>,
    );

    return (allTasks ?? []).reduce((acc, t) => {
      acc[t.priority]++;
      return acc;
    }, initialCounts);
  }, [allTasks]);

  return (
    <DataTableFacetedFilter
      title="Priority"
      options={PRIORITY_OPTIONS}
      selectedValues={selectedPriorities}
      onSelect={(next) => {
        void navigate({
          search: (prev) => ({
            ...prev,
            priority: next.length > 0 ? next : undefined,
          }),
        });
      }}
      counts={counts}
    />
  );
}
