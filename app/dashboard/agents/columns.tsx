"use client";

import type { Agent } from "@/actions/admin-agent-actions";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "agentCode",
    header: "Agent Code",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold">{row.getValue("agentCode")}</span>
    ),
  },
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      const user = row.getValue("user") as Agent["user"];
      return `${user.firstName} ${user.lastName}`;
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => {
      const user = row.original.user;
      return user.email;
    },
  },
  {
    accessorKey: "user.phone",
    header: "Phone",
    cell: ({ row }) => {
      const user = row.original.user;
      return user.phone;
    },
  },
  {
    accessorKey: "wallet",
    header: "Balance",
    cell: ({ row }) => {
      const wallet = row.getValue("wallet") as Agent["wallet"];
      return (
        <span className="font-semibold">
          ৳{wallet.balance.toLocaleString()}
        </span>
      );
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
          : status === "PENDING"
            ? "secondary"
            : status === "REJECTED"
              ? "destructive"
              : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ row }) => moment(row.getValue("createdAt")).format("MMM DD, YYYY"),
  },
];

