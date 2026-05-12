import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { cn, getPageNumbers } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePaginationProps = {
  /** Total number of items (used to derive total pages). */
  totalCount: number;
  className?: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export function DataTablePagination({
  totalCount,
  className,
}: DataTablePaginationProps) {
  const navigate = useNavigate({ from: "/tasks" });
  const { offset = 1, limit = 10 } = useSearch({ from: "/_protected/tasks" });

  const currentPage = offset;
  const pageSize = limit;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  function goTo(page: number) {
    void navigate({
      search: (prev) => ({ ...prev, offset: page }),
    });
  }

  function setPageSize(size: number) {
    void navigate({
      // Reset to page 1 when changing page size
      search: (prev) => ({ ...prev, limit: size, offset: 1 }),
    });
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between overflow-clip px-2",
        "@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4",
        className,
      )}
      style={{ overflowClipMargin: 1 }}
    >
      {/* Left side: rows-per-page + small viewport page indicator */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => setPageSize(Number(value))}
            items={PAGE_SIZE_OPTIONS.map((s) => ({
              label: String(s),
              value: String(s),
            }))}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        </div>
      </div>

      {/* Right side: page indicator + nav buttons */}
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex w-25 items-center justify-center text-sm font-medium @max-3xl/content:hidden">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button
            variant="outline"
            className="size-8 p-0 @max-md/content:hidden"
            onClick={() => goTo(1)}
            disabled={!canPrev}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => goTo(currentPage - 1)}
            disabled={!canPrev}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page number buttons */}
          {pageNumbers.map((pageNumber, index) => (
            <div key={`${pageNumber}-${index}`} className="flex items-center">
              {pageNumber === "..." ? (
                <span className="px-1 text-sm text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  className="h-8 min-w-8 px-2"
                  onClick={() => goTo(pageNumber as number)}
                >
                  <span className="sr-only">Go to page {pageNumber}</span>
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}

          {/* Next page */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => goTo(currentPage + 1)}
            disabled={!canNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            className="size-8 p-0 @max-md/content:hidden"
            onClick={() => goTo(totalPages)}
            disabled={!canNext}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
