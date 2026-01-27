"use client";

import type { Consumer } from "@/actions/admin-consumer-actions";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<Consumer>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "walletBalance",
    header: "Balance",
    cell: ({ row }) => (
      <span className="font-semibold">
        ৳{row.getValue<number>("walletBalance").toLocaleString()}
      </span>
    ),
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
            ? "destructive"
            : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => moment(row.getValue("createdAt")).format("MMM DD, YYYY"),
  },
];

