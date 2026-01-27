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
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { BillerDataTable } from "./data-table";
import { BillerProvider, useBillerContext } from "./context";

function BillerManagementContent() {
  const { filter, setFilter, setCurrentPage } = useBillerContext();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, search: value });
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setFilter({ ...filter, billType: value === "all" ? undefined : value });
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setFilter({ ...filter, status: value === "all" ? undefined : value });
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Biller Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage bill payment service providers
            </p>
          </div>
          <Link href="/dashboard/billers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Biller
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or biller code..."
              value={filter.search || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={filter.billType || "all"}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ELECTRICITY">Electricity</SelectItem>
              <SelectItem value="GAS">Gas</SelectItem>
              <SelectItem value="WATER">Water</SelectItem>
              <SelectItem value="INTERNET">Internet</SelectItem>
              <SelectItem value="MOBILE">Mobile</SelectItem>
              <SelectItem value="TV">TV</SelectItem>
              <SelectItem value="ORGANIZATION">Organization</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.status || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <BillerDataTable />
      </div>
    </main>
  );
}

export default function BillerManagementPage() {
  return (
    <BillerProvider>
      <BillerManagementContent />
    </BillerProvider>
  );
}

