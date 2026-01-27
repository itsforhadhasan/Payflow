"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import { ConsumerProvider, useConsumerContext } from "./context";
import { DataTable } from "./data-table";

function ConsumerListContent() {
  const {
    consumers,
    isLoading,
    currentPage,
    totalPages,
    total,
    filter,
    setCurrentPage,
    setFilter,
  } = useConsumerContext();

  const [searchTerm, setSearchTerm] = useState(filter.search || "");
  const [statusFilter, setStatusFilter] = useState(filter.status || "all");

  const handleSearch = () => {
    setFilter({
      ...filter,
      search: searchTerm || undefined,
    });
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setFilter({
      ...filter,
      status: value === "all" ? undefined : value,
    });
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            Consumer Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor consumer accounts
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2 flex-1 max-w-md">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          {isLoading ? (
            <div className="p-6 text-sm text-muted-foreground">
              Loading consumers...
            </div>
          ) : (
            <>
              <DataTable columns={columns} data={consumers} />

              {/* Pagination */}
              <div className="flex items-center justify-between border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Showing {consumers.length} of {total} consumers
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-2 px-3 text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ConsumersPage() {
  return (
    <ConsumerProvider>
      <ConsumerListContent />
    </ConsumerProvider>
  );
}

