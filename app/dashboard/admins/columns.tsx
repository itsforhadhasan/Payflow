"use client";

import { ADMIN_DELETE } from "@/actions/admin-actions";
import ToggleAdminStatus from "@/components/people/ToggleAdminStatus";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "./context";
import type { Admin } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

interface ActionsCellProps {
  row: {
    original: Admin;
  };
}

function ActionsCell({ row }: ActionsCellProps) {
  const user = row.original;
  const [isDeleting, setIsDeleting] = useState(false);
  const { refresh } = useAdmin();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(user.email).then(() => {
              toast.success("The email has been copied to your clipboard");
            })
          }
        >
          Copy Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <ToggleAdminStatus row={row} refresh={refresh} />

        <DropdownMenuItem
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleting(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const response = await ADMIN_DELETE(row.original.id);

                if (response.success) {
                  toast.success("Account has been deleted");
                } else {
                  toast.error(response.error);
                }

                refresh();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    id: "createdAt",
    header: "Joined At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return moment(createdAt).format("DD MMM YYYY - hh:mm A");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
