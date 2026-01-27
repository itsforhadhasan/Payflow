"use client";

import { columns } from "./columns";
import { AdminProvider } from "./context";
import { DataTable } from "./data-table";

export default function Admin() {
  return (
    <AdminProvider>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="">
          <h1 className="text-lg font-semibold md:text-2xl">Admin</h1>
          <DataTable columns={columns} />
        </div>
      </main>
    </AdminProvider>
  );
}
