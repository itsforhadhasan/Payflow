"use client";

import { BILLER_LIST, type Biller, type BillerFilter } from "@/actions/admin-biller-actions";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface BillerContextType {
  billers: Biller[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  filter: BillerFilter;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: BillerFilter) => void;
  refetch: () => void;
}

const BillerContext = createContext<BillerContextType | undefined>(undefined);

export function useBillerContext() {
  const context = useContext(BillerContext);
  if (!context) {
    throw new Error("useBillerContext must be used within BillerProvider");
  }
  return context;
}

export function BillerProvider({ children }: { children: React.ReactNode }) {
  const [billers, setBillers] = useState<Biller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<BillerFilter>({});

  const fetchBillers = async () => {
    setIsLoading(true);
    const response = await BILLER_LIST(currentPage, 20, filter);

    if (response.success && response.data) {
      setBillers(response.data.billers);
      setTotalPages(response.data.pagination.totalPages);
    } else {
      toast.error("Failed to fetch billers");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBillers();
  }, [currentPage, filter]);

  const refetch = () => {
    fetchBillers();
  };

  return (
    <BillerContext.Provider
      value={{
        billers,
        isLoading,
        currentPage,
        totalPages,
        filter,
        setCurrentPage,
        setFilter,
        refetch,
      }}
    >
      {children}
    </BillerContext.Provider>
  );
}

