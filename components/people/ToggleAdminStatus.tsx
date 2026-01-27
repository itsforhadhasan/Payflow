import { ADMIN_TOGGLE_STATUS } from "@/actions/admin-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { Admin } from "@/types";

interface ToggleAdminStatusProps {
  row: {
    original: Admin;
  };
  refresh: () => void;
}

export default function ToggleAdminStatus({ row, refresh }: ToggleAdminStatusProps) {
  return (
    <DropdownMenuItem
      onClick={async () => {
        const response = await ADMIN_TOGGLE_STATUS(row.original.id);

        if (response.success) {
          toast.success("Account status has been updated");
        } else {
          toast.error(response.error);
        }

        refresh();
      }}
    >
      {row.original.status ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}
