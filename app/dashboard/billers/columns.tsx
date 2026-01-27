"use client";

import type { Biller } from "@/actions/admin-biller-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import moment from "moment";

export const columns: ColumnDef<Biller>[] = [
  {
    accessorKey: "billerCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Biller Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold">{row.getValue("billerCode")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Biller Name",
    cell: ({ row }) => (
      <div className="max-w-[250px]">
        <div className="font-medium truncate">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "billType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("billType") as string;
      return <Badge variant="outline">{type}</Badge>;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.getValue("balance") as number;
      return <span className="font-semibold">৳{balance.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "ACTIVE"
          ? "default"
          : status === "SUSPENDED"
            ? "secondary"
            : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => moment(row.getValue("createdAt")).format("MMM DD, YYYY"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const biller = row.original;
      return (
        <Link href={`/dashboard/billers/${biller.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      );
    },
  },
];

