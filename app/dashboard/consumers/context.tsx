"use client";

import {
  CONSUMER_LIST,
  type Consumer,
  type ConsumerFilter,
} from "@/actions/admin-consumer-actions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

interface ConsumerContextType {
  consumers: Consumer[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  filter: ConsumerFilter;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: ConsumerFilter) => void;
  refresh: () => void;
}

const ConsumerContext = createContext<ConsumerContextType | undefined>(
  undefined
);

export const useConsumerContext = () => {
  const context = useContext(ConsumerContext);
  if (!context) {
    throw new Error(
      "useConsumerContext must be used within ConsumerProvider"
    );
  }
  return context;
};

interface ConsumerProviderProps {
  children: ReactNode;
}

export function ConsumerProvider({ children }: ConsumerProviderProps) {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<ConsumerFilter>({});

  const fetchConsumers = useCallback(async () => {
    setIsLoading(true);
    const offset = (currentPage - 1) * limit;
    const response = await CONSUMER_LIST(offset, limit, filter);

    if (response.success && response.data) {
      setConsumers(response.data.consumers);
      setTotal(response.data.pagination.total);
    } else {
      toast.error(response.error || "Failed to fetch consumers");
    }
    setIsLoading(false);
  }, [currentPage, limit, filter]);

  useEffect(() => {
    fetchConsumers();
  }, [fetchConsumers]);

  const totalPages = Math.ceil(total / limit);

  const value: ConsumerContextType = {
    consumers,
    isLoading,
    currentPage,
    totalPages,
    limit,
    total,
    filter,
    setCurrentPage,
    setFilter,
    refresh: fetchConsumers,
  };

  return (
    <ConsumerContext.Provider value={value}>
      {children}
    </ConsumerContext.Provider>
  );
}

