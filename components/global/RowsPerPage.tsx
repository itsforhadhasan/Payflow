import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RowsPerPageProps {
  limit: number;
  updateLimit: (limit: number) => void;
  handlePageChange: (page: number) => void;
}

export default function RowsPerPage({ limit, updateLimit, handlePageChange }: RowsPerPageProps) {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="rowsPerPage" className="text-sm font-medium">
        Rows per page:
      </label>
      <Select
        value={limit.toString()}
        onValueChange={(value) => {
          updateLimit(parseInt(value));
          handlePageChange(1);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={limit} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
