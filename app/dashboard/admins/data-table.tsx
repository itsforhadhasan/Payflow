"use client";

import NewAdmin from "@/components/people/NewAdmin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { CalendarIcon, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAdmin } from "./context";
import type { Admin } from "@/types";

interface DataTableProps {
  columns: ColumnDef<Admin>[];
}

export function DataTable({ columns }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const {
    data,
    pageIndex,
    pageSize,
    totalCount,
    fetched,
    isLoading,
    goToPage,
    changePageSize,
    searchQuery,
    changeSearchQuery,
    triggerSearch,
    createdAtStart,
    createdAtEnd,
    changeDateStart,
    changeDateEnd,
    applyDateRange,
  } = useAdmin();

  const formattedRange = useMemo(() => {
    if (createdAtStart && createdAtEnd)
      return `${createdAtStart} → ${createdAtEnd}`;
    if (createdAtStart) return `${createdAtStart} → …`;
    if (createdAtEnd) return `… → ${createdAtEnd}`;
    return "Select date range";
  }, [createdAtStart, createdAtEnd]);

  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  const canPreviousPage = pageIndex > 0;
  const canNextPage = (pageIndex + 1) * pageSize < totalCount;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="space-x-2">
                <CalendarIcon size={16} />
                <span className="truncate max-w-[200px] text-left">
                  {formattedRange}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <VisuallyHidden>
                <DialogTitle>Select Date Range</DialogTitle>
              </VisuallyHidden>
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm text-muted-foreground">Start</label>
                  <div className="relative w-full">
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white transition-opacity hover:opacity-80 focus:outline-none"
                      title="Open start date picker"
                      onClick={() => {
                        if (startInputRef.current) {
                          if (
                            typeof startInputRef.current.showPicker ===
                            "function"
                          ) {
                            startInputRef.current.showPicker();
                          } else {
                            startInputRef.current.focus();
                          }
                        }
                      }}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </button>
                    <Input
                      type="date"
                      value={createdAtStart}
                      onChange={(e) => changeDateStart(e.target.value)}
                      ref={startInputRef}
                      className="w-full pl-8 pr-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm text-muted-foreground">End</label>
                  <div className="relative w-full">
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white transition-opacity hover:opacity-80 focus:outline-none"
                      title="Open end date picker"
                      onClick={() => {
                        if (endInputRef.current) {
                          if (
                            typeof endInputRef.current.showPicker === "function"
                          ) {
                            endInputRef.current.showPicker();
                          } else {
                            endInputRef.current.focus();
                          }
                        }
                      }}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </button>
                    <Input
                      type="date"
                      value={createdAtEnd}
                      onChange={(e) => changeDateEnd(e.target.value)}
                      ref={endInputRef}
                      className="w-full pl-8 pr-2"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="default"
                  className="ml-auto"
                  onClick={() => {
                    applyDateRange(createdAtStart, createdAtEnd);
                    setIsDateDialogOpen(false);
                  }}
                  title="Apply date range"
                >
                  Search
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {(createdAtStart || createdAtEnd) && (
            <Button
              variant="ghost"
              size="icon"
              title="Clear date range"
              onClick={() => applyDateRange("", "")}
            >
              <X size={16} />
            </Button>
          )}
          <Input
            placeholder="Filter admin by name, id, email"
            value={searchQuery}
            onChange={(event) => changeSearchQuery(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                triggerSearch();
              }
            }}
            className="w-md"
          />
        </div>

        <NewAdmin />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => changePageSize(Number(v))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {startRow} to {endRow} of {totalCount} admin
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pageIndex - 1)}
            disabled={!canPreviousPage || isLoading}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize) || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pageIndex + 1)}
            disabled={!canNextPage || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
