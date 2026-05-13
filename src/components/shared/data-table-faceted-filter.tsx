import type { ComponentType } from "react";

import { Check, CirclePlus } from "lucide-react";

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

type DataTableFacetedFilterProps<TValue extends string> = {
  title?: string;
  options: {
    label: string;
    value: TValue;
    icon?: ComponentType<{ className?: string }>;
  }[];
  selectedValues?: TValue[];
  onSelect: (values: TValue[]) => void;
  counts?: Record<string, number>;
};

export function DataTableFacetedFilter<TValue extends string>({
  title,
  options,
  selectedValues = [],
  onSelect,
  counts,
}: DataTableFacetedFilterProps<TValue>) {
  const selectedValuesSet = new Set(selectedValues);

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
            {title}
            {selectedValuesSet.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValuesSet.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValuesSet.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValuesSet.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValuesSet.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValuesSet.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValuesSet.delete(option.value);
                      } else {
                        selectedValuesSet.add(option.value);
                      }
                      const filterValues = Array.from(selectedValuesSet);
                      onSelect(filterValues);
                    }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border-[1.5px] transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/40 bg-transparent",
                      )}
                    >
                      {isSelected && (
                        <Check className="size-3 stroke-[2.5] text-primary-foreground" />
                      )}
                    </div>
                    {option.icon && (
                      <option.icon className="size-4 text-muted-foreground" />
                    )}
                    <span className="flex-1">{option.label}</span>
                    {counts?.[option.value] !== undefined && (
                      <span className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {counts[option.value]}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelect([])}
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
